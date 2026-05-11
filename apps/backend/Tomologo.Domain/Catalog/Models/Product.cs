namespace Tomologo.Domain.Catalog.Models;

public sealed record Money(decimal Amount);

public sealed record Product(
    Guid Id,
    string Slug,
    string Name,
    string? Brand,
    Money Price,
    string Currency,
    /// <summary>EUR liste fiyatı (<c>product_prices</c> satırından); yoksa EUR vitrinde kullanılmaz.</summary>
    Money? EuroPrice,
    string CategorySlug,
    string Image,
    string Description,
    ProductInventory? Inventory,
    IReadOnlyList<ProductColor> Colors);

