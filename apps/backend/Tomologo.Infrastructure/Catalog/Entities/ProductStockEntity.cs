namespace Tomologo.Infrastructure.Catalog.Entities;

/// <summary>Ürün başına 1:1 stok (SKU ayrımı ileride <c>product_variants</c> ile genişletilebilir).</summary>
public sealed class ProductStockEntity
{
    public Guid ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;

    public int QuantityOnHand { get; set; }
    public int QuantityReserved { get; set; }
}
