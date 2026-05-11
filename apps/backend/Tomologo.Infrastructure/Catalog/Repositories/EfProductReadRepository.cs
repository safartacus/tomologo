using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Tomologo.Application.Catalog;
using Tomologo.Domain.Catalog.Models;
using Tomologo.Infrastructure.Catalog.Entities;
using Tomologo.Infrastructure.Catalog.Persistence;

namespace Tomologo.Infrastructure.Catalog.Repositories;

public sealed class EfProductReadRepository : IProductReadRepository
{
    private static readonly JsonSerializerOptions ColorJsonRead = new()
    {
        PropertyNameCaseInsensitive = true,
    };

    private readonly TomologoCatalogDbContext _db;

    public EfProductReadRepository(TomologoCatalogDbContext db)
    {
        _db = db;
    }

    public async Task<IReadOnlyList<Product>> ListAsync(CancellationToken cancellationToken)
    {
        var entities = await _db.Products
            .AsNoTracking()
            .Include(p => p.Prices)
            .Include(p => p.Stock)
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);

        return entities.Select(Map).ToList();
    }

    public async Task<Product?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var e = await _db.Products
            .AsNoTracking()
            .Include(p => p.Prices)
            .Include(p => p.Stock)
            .SingleOrDefaultAsync(x => x.Slug == slug, cancellationToken);

        return e is null ? null : Map(e);
    }

    public async Task<IReadOnlyList<string>> GetCategorySlugsAsync(CancellationToken cancellationToken)
    {
        return await _db.Products
            .AsNoTracking()
            .Select(p => p.CategorySlug)
            .Distinct()
            .OrderBy(x => x)
            .ToListAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Product>> ListByCategorySlugAsync(
        string categorySlug,
        CancellationToken cancellationToken)
    {
        var entities = await _db.Products
            .AsNoTracking()
            .Include(p => p.Prices)
            .Include(p => p.Stock)
            .Where(p => p.CategorySlug == categorySlug)
            .OrderBy(x => x.Name)
            .ToListAsync(cancellationToken);

        return entities.Select(Map).ToList();
    }

    private static Product Map(ProductEntity e)
    {
        var tryPrice = e.Prices.FirstOrDefault(x =>
            string.Equals(x.Currency, "TRY", StringComparison.OrdinalIgnoreCase));

        if (tryPrice is null)
        {
            throw new InvalidOperationException(
                $"Ürün '{e.Slug}' için TRY fiyat satırı yok; product_prices seed veya migrasyonunu kontrol edin.");
        }

        var eurPrice = e.Prices.FirstOrDefault(x =>
            string.Equals(x.Currency, "EUR", StringComparison.OrdinalIgnoreCase));

        ProductInventory? inventory = e.Stock is null
            ? null
            : new ProductInventory(e.Stock.QuantityOnHand, e.Stock.QuantityReserved);

        return new Product(
            e.Id,
            e.Slug,
            e.Name,
            e.Brand,
            new Money(tryPrice.Amount),
            "TRY",
            eurPrice is null ? null : new Money(eurPrice.Amount),
            e.CategorySlug,
            e.Image,
            e.Description,
            inventory,
            ParseColors(e.ColorsJson));
    }

    private static IReadOnlyList<ProductColor> ParseColors(string? json)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            return Array.Empty<ProductColor>();
        }

        try
        {
            var rows = JsonSerializer.Deserialize<List<ColorJsonRow>>(json, ColorJsonRead);
            if (rows is null || rows.Count == 0)
            {
                return Array.Empty<ProductColor>();
            }

            return rows
                .Where(r => !string.IsNullOrWhiteSpace(r.Name) && !string.IsNullOrWhiteSpace(r.Hex))
                .Select(r => new ProductColor(r.Name!, r.Hex!))
                .ToArray();
        }
        catch (JsonException)
        {
            return Array.Empty<ProductColor>();
        }
    }

    private sealed class ColorJsonRow
    {
        public string? Name { get; set; }
        public string? Hex { get; set; }
    }
}
