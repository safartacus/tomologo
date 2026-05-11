using Tomologo.Api.Http;
using Tomologo.Application.Catalog;
using Tomologo.Application.Catalog.Pricing;

namespace Tomologo.Api.Endpoints;

public static class CategoriesEndpoints
{
    public static IEndpointRouteBuilder MapCategoriesEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").WithTags("Catalog");

        api.MapGet(
                "/categories",
                async (IProductReadRepository repo, CancellationToken ct) =>
                {
                    var slugs = await repo.GetCategorySlugsAsync(ct);
                    return slugs.ToArray();
                })
            .WithName("ListCategories")
            .WithSummary("Kategorileri listeler")
            .WithDescription("Ürünlerden türetilmiş kategori slug'ları.");

        api.MapGet(
                "/categories/{slug}/products",
                async (
                    string slug,
                    IProductReadRepository repo,
                    ICatalogPricePresenter pricing,
                    HttpContext http,
                    CancellationToken ct) =>
                {
                    var currency = CatalogRequestCurrency.Read(http.Request);
                    var products = await repo.ListByCategorySlugAsync(slug, ct);
                    return products.Select(p => pricing.Present(p, currency)).ToArray();
                })
            .WithName("ListCategoryProducts")
            .WithSummary("Kategori ürünlerini listeler");

        return app;
    }
}

