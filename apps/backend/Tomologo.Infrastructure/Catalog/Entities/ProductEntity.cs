namespace Tomologo.Infrastructure.Catalog.Entities;

public sealed class ProductEntity
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? Brand { get; set; }

    public string CategorySlug { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    /// <summary>JSON dizi: [{"name":"...","hex":"#..."}]</summary>
    public string? ColorsJson { get; set; }

    public ICollection<ProductPriceEntity> Prices { get; set; } = new List<ProductPriceEntity>();

    public ProductStockEntity? Stock { get; set; }
}
