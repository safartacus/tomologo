using Tomologo.Application.Catalog;
using Tomologo.Domain.Catalog.Models;

namespace Tomologo.Application.Catalog.Pricing;

/// <summary>
/// Ürün fiyatını kaynak para biriminden istenen gösterim para birimine çevirir ve DTO üretir.
/// </summary>
public interface ICatalogPricePresenter
{
    ProductListItemDto Present(Product product, string? requestedDisplayCurrency);
}
