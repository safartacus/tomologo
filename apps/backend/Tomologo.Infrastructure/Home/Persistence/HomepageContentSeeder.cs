using Microsoft.EntityFrameworkCore;
using Tomologo.Infrastructure.Catalog.Persistence;
using Tomologo.Infrastructure.Home.Entities;

namespace Tomologo.Infrastructure.Home.Persistence;

/// <summary>Sabit kimlikler — tek satır “canlı” ana sayfa kaydı.</summary>
public static class HomepageContentIds
{
    public static readonly Guid Campaign = Guid.Parse("11111111-1111-1111-1111-111111111101");
    public static readonly Guid Banner = Guid.Parse("11111111-1111-1111-1111-111111111102");
    public static readonly Guid SpotlightSection = Guid.Parse("11111111-1111-1111-1111-111111111103");
    public static readonly Guid Story = Guid.Parse("11111111-1111-1111-1111-111111111104");
}

public static class HomepageContentSeeder
{
    /// <summary>Mevcut DB’de <c>EnsureCreated</c> tablo eklemez; ham SQL ile oluşturur.</summary>
    public static async Task EnsureSchemaAsync(
        TomologoCatalogDbContext db,
        CancellationToken cancellationToken = default)
    {
        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "homepage_campaign" (
                "Id" uuid NOT NULL,
                "Title" character varying(500) NOT NULL,
                "IsActive" boolean NOT NULL,
                "CampaignName" character varying(100) NOT NULL,
                CONSTRAINT "PK_homepage_campaign" PRIMARY KEY ("Id")
            );
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "homepage_banner" (
                "Id" uuid NOT NULL,
                "BannerTitle" character varying(200) NOT NULL,
                "Url" character varying(2048) NOT NULL,
                CONSTRAINT "PK_homepage_banner" PRIMARY KEY ("Id")
            );
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "homepage_revive_spotlight" (
                "Id" uuid NOT NULL,
                "IsActive" boolean NOT NULL,
                CONSTRAINT "PK_homepage_revive_spotlight" PRIMARY KEY ("Id")
            );
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "homepage_revive_spotlight_item" (
                "Id" uuid NOT NULL,
                "SectionId" uuid NOT NULL,
                "SortOrder" integer NOT NULL,
                "Name" character varying(300) NOT NULL,
                "Image" character varying(2048) NOT NULL,
                "Slug" character varying(200) NOT NULL,
                CONSTRAINT "PK_homepage_revive_spotlight_item" PRIMARY KEY ("Id"),
                CONSTRAINT "FK_homepage_revive_spotlight_item_homepage_revive_spotlight_SectionId"
                    FOREIGN KEY ("SectionId") REFERENCES "homepage_revive_spotlight" ("Id") ON DELETE CASCADE
            );
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE UNIQUE INDEX IF NOT EXISTS "IX_homepage_revive_spotlight_item_Slug"
                ON "homepage_revive_spotlight_item" ("Slug");
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE INDEX IF NOT EXISTS "IX_homepage_revive_spotlight_item_SectionId"
                ON "homepage_revive_spotlight_item" ("SectionId");
            """,
            cancellationToken);

        await db.Database.ExecuteSqlRawAsync(
            """
            CREATE TABLE IF NOT EXISTS "homepage_revive_story" (
                "Id" uuid NOT NULL,
                "IsActive" boolean NOT NULL,
                "Text" character varying(8000) NOT NULL,
                CONSTRAINT "PK_homepage_revive_story" PRIMARY KEY ("Id")
            );
            """,
            cancellationToken);
    }

    /// <summary>Tablolar boşsa varsayılan içeriği yükler; doluysa dokunmaz (admin verisini ezmez).</summary>
    public static async Task SeedIfEmptyAsync(
        TomologoCatalogDbContext db,
        CancellationToken cancellationToken = default)
    {
        if (!await db.HomepageCampaigns.AnyAsync(cancellationToken))
        {
            db.HomepageCampaigns.Add(
                new HomepageCampaignEntity
                {
                    Id = HomepageContentIds.Campaign,
                    Title =
                        "ANNELER GÜNÜNE ÖZEL \"ANNELERGÜNÜ30\" KODUYLA SEPETTE %30 İNDİRİM!",
                    IsActive = true,
                    CampaignName = "motherday",
                });
        }

        if (!await db.HomepageBanners.AnyAsync(cancellationToken))
        {
            db.HomepageBanners.Add(
                new HomepageBannerEntity
                {
                    Id = HomepageContentIds.Banner,
                    BannerTitle = "defaultBanner",
                    Url =
                        "https://tomologo-official.com/wp-content/uploads/2024/12/tomologo-canta-banner-scaled.jpg",
                });
        }

        if (!await db.HomepageReviveSpotlightSections.AnyAsync(cancellationToken))
        {
            var section = new HomepageReviveSpotlightSectionEntity
            {
                Id = HomepageContentIds.SpotlightSection,
                IsActive = true,
            };

            var items = new[]
            {
                (
                    Slug: "mini-clutch-koyu-kahverengi",
                    Name: "Revive Clutch – Kahverengi Süet",
                    Image:
                        "https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-suet-kahve-1-y-768x1024.jpg",
                    Order: 0),
                (
                    Slug: "mini-clutch-kemik",
                    Name: "Revive Clutch – Kemik",
                    Image:
                        "https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-BT-kemik-1-y-768x1024.jpg",
                    Order: 1),
                (
                    Slug: "mini-clutch-koi",
                    Name: "Revive Clutch – Kızıl Yılan",
                    Image:
                        "https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-baski-yilan-turuncu-1-768x1024.jpg",
                    Order: 2),
            };

            foreach (var it in items)
            {
                section.Items.Add(
                    new HomepageReviveSpotlightItemEntity
                    {
                        Id = Guid.CreateVersion7(),
                        SortOrder = it.Order,
                        Name = it.Name,
                        Image = it.Image,
                        Slug = it.Slug,
                    });
            }

            db.HomepageReviveSpotlightSections.Add(section);
        }

        if (!await db.HomepageReviveStories.AnyAsync(cancellationToken))
        {
            db.HomepageReviveStories.Add(
                new HomepageReviveStoryEntity
                {
                    Id = HomepageContentIds.Story,
                    IsActive = true,
                    Text =
                        "20 yıl önce üç küçük kızın modayı oyunlaştırarak yarattığı renkli dünyanın bize armağanı olan TOMOLOGO'nun kalbinde usta zanaatkarların elinden çıkmış zamansız ve fonksiyonel parçalar yatar.",
                });
        }

        await db.SaveChangesAsync(cancellationToken);
    }
}
