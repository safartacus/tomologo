using Tomologo.Domain.Catalog.Models;

namespace Tomologo.Application.Catalog;

public static class ProductMapping
{
    /// <summary>Kaynak ve gösterim aynı para birimi (dönüşüm yok).</summary>
    public static ProductListItemDto ToListItemDto(this Product product) =>
        product.ToListItemDto(product.Price.Amount, product.Currency);

    /// <summary>Gösterim tutarı ayrı; kaynak her zaman üründeki depo para birimidir.</summary>
    public static ProductListItemDto ToListItemDto(
        this Product product,
        decimal displayPriceAmount,
        string displayCurrency) =>
        new(
            product.Id,
            product.Slug,
            product.Name,
            product.Brand,
            displayPriceAmount,
            displayCurrency,
            product.Price.Amount,
            product.Currency,
            product.EuroPrice?.Amount,
            product.CategorySlug,
            product.Image,
            product.Description,
            product.Colors.Select(c => new ProductColorDto(c.Name, c.Hex)).ToArray(),
            product.Inventory?.QuantityOnHand ?? 0,
            product.Inventory?.QuantityReserved ?? 0);
}

