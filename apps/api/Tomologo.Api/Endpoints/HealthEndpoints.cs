using Microsoft.AspNetCore.Http.HttpResults;

namespace Tomologo.Api.Endpoints;

public static class HealthEndpoints
{
    public static IEndpointRouteBuilder MapHealthEndpoints(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("/api").WithTags("Health");

        api.MapGet(
                "/health",
                () => TypedResults.Ok(new HealthResponse("Healthy", DateTime.UtcNow)))
            .WithName("GetHealth")
            .WithSummary("Sağlık kontrolü")
            .WithDescription("Yük dengeleyici ve gözlem araçları için basit canlılık yanıtı.");

        return app;
    }
}

public sealed record HealthResponse(string Status, DateTime UtcTimestamp);
