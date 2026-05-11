using Microsoft.AspNetCore.Http;
using Tomologo.Api.Http;
using Tomologo.Application.Catalog;
using Tomologo.Application.Catalog.Pricing;

namespace Tomologo.Api.Endpoints;

public static class ProductsEndpoints
{
    public static IEndpointRouteBuilder MapProductsEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").WithTags("Catalog");

        api.MapGet(
                "/products",
                async (
                    IProductReadRepository repo,
                    ICatalogPricePresenter pricing,
                    HttpContext http,
                    CancellationToken ct) =>
                {
                    var currency = CatalogRequestCurrency.Read(http.Request);
                    var products = await repo.ListAsync(ct);
                    return products.Select(p => pricing.Present(p, currency)).ToArray();
                })
            .WithName("ListProducts")
            .WithSummary("Ürünleri listeler")
            .WithDescription(
                "Kategori sayfası ve ana sayfa vitrinleri için ürün listeleme. Gösterim para birimi: " +
                CatalogRequestCurrency.QueryName +
                " sorgusu veya " +
                CatalogRequestCurrency.HeaderName +
                " başlığı (örn. EUR). Yanıtta basePriceAmount/baseCurrency kaynak fiyatı verir.");

        api.MapGet(
                "/products/{slug}",
                async (
                    string slug,
                    IProductReadRepository repo,
                    ICatalogPricePresenter pricing,
                    HttpContext http,
                    CancellationToken ct) =>
                {
                    var product = await repo.GetBySlugAsync(slug, ct);
                    if (product is null)
                    {
                        return Results.NotFound();
                    }

                    var currency = CatalogRequestCurrency.Read(http.Request);
                    return Results.Ok(pricing.Present(product, currency));
                })
            .WithName("GetProductBySlug")
            .WithSummary("Ürün detayı")
            .WithDescription("Slug'e göre ürün döndürür.");

        return app;
    }
}

