namespace Tomologo.Application.Catalog;

public sealed record ProductListItemDto(
    Guid Id,
    string Slug,
    string Name,
    string? Brand,
    /// <summary>İstemcinin talep ettiği para biriminde tutar (ör. EUR).</summary>
    decimal PriceAmount,
    /// <summary><c>PriceAmount</c> alanının ISO 4217 kodu.</summary>
    string Currency,
    /// <summary>Veritabanı / fiyat listesi kaynak tutarı (şu an TRY).</summary>
    decimal BasePriceAmount,
    /// <summary><c>BasePriceAmount</c> için ISO kodu.</summary>
    string BaseCurrency,
    /// <summary><c>product_prices</c> içindeki EUR liste fiyatı; yoksa null.</summary>
    decimal? EuroPriceAmount,
    string CategorySlug,
    string Image,
    string Description,
    IReadOnlyList<ProductColorDto> Colors,
    /// <summary><c>product_stocks.QuantityOnHand</c>; satır yoksa 0.</summary>
    int QuantityOnHand,
    /// <summary><c>product_stocks.QuantityReserved</c>; satır yoksa 0.</summary>
    int QuantityReserved);

