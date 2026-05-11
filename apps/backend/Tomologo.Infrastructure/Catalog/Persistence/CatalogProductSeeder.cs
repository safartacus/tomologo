using Microsoft.EntityFrameworkCore;
using Tomologo.Infrastructure.Catalog.Entities;

namespace Tomologo.Infrastructure.Catalog.Persistence;

public static class CatalogProductSeeder
{
    /// <summary>
    /// Eski veritabanlarında kolon yoksa ekler (EnsureCreated ile oluşan yeni şemada zaten vardır).
    /// </summary>
    public static async Task EnsureColorsColumnAsync(
        TomologoCatalogDbContext db,
        CancellationToken cancellationToken = default)
    {
        await db.Database.ExecuteSqlRawAsync(
            """
            ALTER TABLE products ADD COLUMN IF NOT EXISTS "ColorsJson" character varying(8000) NULL;
            """,
            cancellationToken);
    }

    /// <summary>
    /// <c>product_prices</c> ve <c>product_stocks</c> tablolarını oluşturur; eski <c>products</c> fiyat kolonlarından bir kerelik kopyalar.
    /// </summary>
    public static async Task EnsureNormalizedCatalogSchemaAsync(
        TomologoCatalogDbContext db,
        CancellationToken cancellationToken = default)
    {
        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "product_prices" (
                "Id" uuid NOT NULL,
                "ProductId" uuid NOT NULL,
                "Currency" character varying(3) NOT NULL,
                "Amount" numeric(18,2) NOT NULL,
                CONSTRAINT "PK_product_prices" PRIMARY KEY ("Id"),
                CONSTRAINT "FK_product_prices_products_ProductId" FOREIGN KEY ("ProductId") REFERENCES products ("Id") ON DELETE CASCADE
            );
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE UNIQUE INDEX IF NOT EXISTS "IX_product_prices_ProductId_Currency" ON "product_prices" ("ProductId", "Currency");
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "product_stocks" (
                "ProductId" uuid NOT NULL,
                "QuantityOnHand" integer NOT NULL,
                "QuantityReserved" integer NOT NULL,
                CONSTRAINT "PK_product_stocks" PRIMARY KEY ("ProductId"),
                CONSTRAINT "FK_product_stocks_products_ProductId" FOREIGN KEY ("ProductId") REFERENCES products ("Id") ON DELETE CASCADE
            );
            """,
            cancellationToken);

        // Eski kolonlar yoksa bile tüm INSERT parse edilir; 42703 önlemek için yalnızca kolon varken EXECUTE ile planlanır.
        await db.Database.ExecuteSqlRawAsync(
            """
            DO $legacy_try$
            BEGIN
              IF EXISTS (
                SELECT 1 FROM information_schema.columns c
                WHERE c.table_schema = 'public' AND c.table_name = 'products' AND c.column_name = 'PriceAmount'
              ) THEN
                EXECUTE $sql$
                  INSERT INTO "product_prices" ("Id", "ProductId", "Currency", "Amount")
                  SELECT gen_random_uuid(), p."Id", 'TRY', p."PriceAmount"
                  FROM products p
                  WHERE p."PriceAmount" IS NOT NULL
                    AND NOT EXISTS (
                      SELECT 1 FROM "product_prices" pp WHERE pp."ProductId" = p."Id" AND pp."Currency" = 'TRY')
                $sql$;
              END IF;
            END
            $legacy_try$;
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            DO $legacy_eur$
            BEGIN
              IF EXISTS (
                SELECT 1 FROM information_schema.columns c
                WHERE c.table_schema = 'public' AND c.table_name = 'products' AND c.column_name = 'EurPriceAmount'
              ) THEN
                EXECUTE $sql$
                  INSERT INTO "product_prices" ("Id", "ProductId", "Currency", "Amount")
                  SELECT gen_random_uuid(), p."Id", 'EUR', p."EurPriceAmount"
                  FROM products p
                  WHERE p."EurPriceAmount" IS NOT NULL
                    AND NOT EXISTS (
                      SELECT 1 FROM "product_prices" pp WHERE pp."ProductId" = p."Id" AND pp."Currency" = 'EUR')
                $sql$;
              END IF;
            END
            $legacy_eur$;
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            INSERT INTO "product_stocks" ("ProductId", "QuantityOnHand", "QuantityReserved")
            SELECT p."Id", 0, 0
            FROM products p
            WHERE NOT EXISTS (SELECT 1 FROM "product_stocks" s WHERE s."ProductId" = p."Id");
            """,
            cancellationToken);
    }

    /// <summary>Slug üzerinden idempotent upsert — seed listesini DB ile eşitler.</summary>
    public static async Task SeedAsync(
        TomologoCatalogDbContext db,
        CancellationToken cancellationToken = default)
    {
        foreach (var row in CatalogProductSeedData.Rows)
        {
            var existing = await db.Products
                .FirstOrDefaultAsync(p => p.Slug == row.Slug, cancellationToken);

            if (existing is null)
            {
                var product = new ProductEntity
                {
                    Id = row.Id,
                    Slug = row.Slug,
                    Name = row.Name,
                    Brand = row.Brand,
                    CategorySlug = row.CategorySlug,
                    Image = row.Image,
                    Description = row.Description,
                    ColorsJson = row.ColorsJson,
                };

                foreach (var (currency, amount) in row.Prices)
                {
                    product.Prices.Add(
                        new ProductPriceEntity
                        {
                            Id = Guid.CreateVersion7(),
                            Currency = currency.ToUpperInvariant(),
                            Amount = amount,
                        });
                }

                product.Stock = new ProductStockEntity
                {
                    QuantityOnHand = row.QuantityOnHand,
                    QuantityReserved = row.QuantityReserved,
                };

                db.Products.Add(product);
                continue;
            }

            existing.Name = row.Name;
            existing.Brand = row.Brand;
            existing.CategorySlug = row.CategorySlug;
            existing.Image = row.Image;
            existing.Description = row.Description;
            existing.ColorsJson = row.ColorsJson;

            // Include + RemoveRange sonrası takipçi ile DB sıklıkla uyumsuz kalır; DELETE/UPDATE 0 satır → DbUpdateConcurrencyException.
            await db.ProductPrices
                .Where(p => p.ProductId == existing.Id)
                .ExecuteDeleteAsync(cancellationToken);

            foreach (var (currency, amount) in row.Prices)
            {
                db.ProductPrices.Add(
                    new ProductPriceEntity
                    {
                        Id = Guid.CreateVersion7(),
                        ProductId = existing.Id,
                        Currency = currency.ToUpperInvariant(),
                        Amount = amount,
                    });
            }

            var stockUpdated = await db.ProductStocks
                .Where(s => s.ProductId == existing.Id)
                .ExecuteUpdateAsync(
                    setters => setters
                        .SetProperty(s => s.QuantityOnHand, row.QuantityOnHand)
                        .SetProperty(s => s.QuantityReserved, row.QuantityReserved),
                    cancellationToken);

            if (stockUpdated == 0)
            {
                db.ProductStocks.Add(
                    new ProductStockEntity
                    {
                        ProductId = existing.Id,
                        QuantityOnHand = row.QuantityOnHand,
                        QuantityReserved = row.QuantityReserved,
                    });
            }
        }

        await db.SaveChangesAsync(cancellationToken);
    }
}
