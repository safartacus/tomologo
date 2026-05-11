using Microsoft.EntityFrameworkCore;
using Tomologo.Infrastructure.Catalog.Entities;
using Tomologo.Infrastructure.Home.Entities;

namespace Tomologo.Infrastructure.Catalog.Persistence;

public sealed class TomologoCatalogDbContext : DbContext
{
    public DbSet<ProductEntity> Products => Set<ProductEntity>();
    public DbSet<ProductPriceEntity> ProductPrices => Set<ProductPriceEntity>();
    public DbSet<ProductStockEntity> ProductStocks => Set<ProductStockEntity>();

    public DbSet<HomepageCampaignEntity> HomepageCampaigns => Set<HomepageCampaignEntity>();
    public DbSet<HomepageBannerEntity> HomepageBanners => Set<HomepageBannerEntity>();
    public DbSet<HomepageReviveSpotlightSectionEntity> HomepageReviveSpotlightSections =>
        Set<HomepageReviveSpotlightSectionEntity>();
    public DbSet<HomepageReviveSpotlightItemEntity> HomepageReviveSpotlightItems =>
        Set<HomepageReviveSpotlightItemEntity>();
    public DbSet<HomepageReviveStoryEntity> HomepageReviveStories => Set<HomepageReviveStoryEntity>();

    public TomologoCatalogDbContext(DbContextOptions<TomologoCatalogDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductEntity>(b =>
        {
            b.ToTable("products");

            b.HasKey(x => x.Id);

            b.Property(x => x.Slug).HasMaxLength(200).IsRequired();
            b.Property(x => x.Name).HasMaxLength(300).IsRequired();
            b.Property(x => x.Brand).HasMaxLength(200);

            b.Property(x => x.CategorySlug).HasMaxLength(100).IsRequired();
            b.Property(x => x.Image).HasMaxLength(2048).IsRequired();
            b.Property(x => x.Description).HasMaxLength(4000).IsRequired();

            b.Property(x => x.ColorsJson).HasMaxLength(8000);

            b.HasIndex(x => x.Slug).IsUnique();
        });

        modelBuilder.Entity<ProductPriceEntity>(b =>
        {
            b.ToTable("product_prices");

            b.HasKey(x => x.Id);

            b.Property(x => x.Currency).HasMaxLength(3).IsRequired();
            b.Property(x => x.Amount).HasColumnType("numeric(18,2)");

            b.HasIndex(x => new { x.ProductId, x.Currency }).IsUnique();

            b.HasOne(x => x.Product)
                .WithMany(p => p.Prices)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProductStockEntity>(b =>
        {
            b.ToTable("product_stocks");

            b.HasKey(x => x.ProductId);

            b.HasOne(x => x.Product)
                .WithOne(p => p.Stock)
                .HasForeignKey<ProductStockEntity>(x => x.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<HomepageCampaignEntity>(b =>
        {
            b.ToTable("homepage_campaign");
            b.HasKey(x => x.Id);
            b.Property(x => x.Title).HasMaxLength(500).IsRequired();
            b.Property(x => x.CampaignName).HasMaxLength(100).IsRequired();
        });

        modelBuilder.Entity<HomepageBannerEntity>(b =>
        {
            b.ToTable("homepage_banner");
            b.HasKey(x => x.Id);
            b.Property(x => x.BannerTitle).HasMaxLength(200).IsRequired();
            b.Property(x => x.Url).HasMaxLength(2048).IsRequired();
        });

        modelBuilder.Entity<HomepageReviveSpotlightSectionEntity>(b =>
        {
            b.ToTable("homepage_revive_spotlight");
            b.HasKey(x => x.Id);
            b.HasMany(x => x.Items)
                .WithOne(x => x.Section)
                .HasForeignKey(x => x.SectionId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<HomepageReviveSpotlightItemEntity>(b =>
        {
            b.ToTable("homepage_revive_spotlight_item");
            b.HasKey(x => x.Id);
            b.Property(x => x.Name).HasMaxLength(300).IsRequired();
            b.Property(x => x.Image).HasMaxLength(2048).IsRequired();
            b.Property(x => x.Slug).HasMaxLength(200).IsRequired();
            b.HasIndex(x => x.Slug).IsUnique();
            b.HasIndex(x => x.SectionId);
        });

        modelBuilder.Entity<HomepageReviveStoryEntity>(b =>
        {
            b.ToTable("homepage_revive_story");
            b.HasKey(x => x.Id);
            b.Property(x => x.Text).HasMaxLength(8000).IsRequired();
        });
    }
}
