using Microsoft.Extensions.Options;
using Tomologo.Api.Configuration;
using Tomologo.Application.Catalog;
using Tomologo.Application.Catalog.Pricing;
using Tomologo.Domain.Catalog.Models;

namespace Tomologo.Api.Catalog;

public sealed class CatalogPricePresenter : ICatalogPricePresenter
{
    private readonly CatalogPricingOptions _options;

    public CatalogPricePresenter(IOptions<CatalogPricingOptions> options)
    {
        _options = options.Value;
    }

    public ProductListItemDto Present(Product product, string? requestedDisplayCurrency)
    {
        var baseCur = Normalize(product.Currency);
        var baseAmt = product.Price.Amount;

        var requested = Normalize(requestedDisplayCurrency);
        if (string.IsNullOrEmpty(requested))
        {
            requested = Normalize(_options.DefaultDisplayCurrency);
        }

        if (requested == baseCur)
        {
            return product.ToListItemDto(baseAmt, baseCur);
        }

        if (requested == "EUR" && product.EuroPrice is { Amount: var eur } && eur > 0)
        {
            return product.ToListItemDto(eur, "EUR");
        }

        return product.ToListItemDto();
    }

    private static string Normalize(string? code) =>
        string.IsNullOrWhiteSpace(code) ? string.Empty : code.Trim().ToUpperInvariant();
}
