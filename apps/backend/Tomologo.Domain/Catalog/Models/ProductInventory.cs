namespace Tomologo.Domain.Catalog.Models;

/// <summary>Ürün stok özeti (rezerve satır ayrımı ile).</summary>
public readonly record struct ProductInventory(int QuantityOnHand, int QuantityReserved)
{
    public int Available => QuantityOnHand - QuantityReserved;
}
