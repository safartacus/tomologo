using Tomologo.Application.Home.Dtos;
using Tomologo.Application.Home.Services;

namespace Tomologo.Api.Endpoints;

public static class HomepageEndpoints
{
    public static IEndpointRouteBuilder MapHomepageEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").WithTags("Homepage");

        api.MapGet(
                "/homepage",
                async (IHomepageReadRepository repo, CancellationToken cancellationToken) =>
                {
                    var dto = await repo.GetAsync(cancellationToken);
                    if (dto is null)
                    {
                        return Results.Problem(
                            statusCode: StatusCodes.Status500InternalServerError,
                            title: "Ana sayfa içeriği yüklenemedi",
                            detail: "Veritabanında homepage_* kayıtları eksik veya tutarsız.");
                    }

                    return Results.Ok(dto);
                })
            .WithName("GetHomepage")
            .WithSummary("Ana sayfa içeriği")
            .WithDescription(
                "Kampanya şeridi, hero görseli, Revive vitrin ve marka metni. " +
                "İçerik `homepage_*` tablolarından okunur; `isActive` ile bölümler kapatılabilir.");

        return app;
    }
}
