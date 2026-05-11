namespace Tomologo.Api.Configuration;

/// <summary>
/// Katalog fiyat gösterimi. EUR tutarları <c>product_prices</c> (Currency = EUR) satırında tutulur; kur çevrimi yoktur.
/// </summary>
public sealed class CatalogPricingOptions
{
    public const string SectionName = "CatalogPricing";

    /// <summary>Depodaki birincil liste fiyatının ISO kodu (TRY).</summary>
    public string BaseCurrency { get; set; } = "TRY";

    /// <summary>İstemci para birimi belirtmezse kullanılan gösterim kodu.</summary>
    public string DefaultDisplayCurrency { get; set; } = "TRY";
}
