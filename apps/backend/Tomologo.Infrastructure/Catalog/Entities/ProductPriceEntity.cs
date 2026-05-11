namespace Tomologo.Infrastructure.Catalog.Entities;

/// <summary>Ürün başına para birimi bazında liste fiyatı (TRY, EUR, …).</summary>
public sealed class ProductPriceEntity
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;

    public string Currency { get; set; } = string.Empty;
    public decimal Amount { get; set; }
}
