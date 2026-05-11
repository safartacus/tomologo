using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.OpenApi.Models;
using Tomologo.Api.Catalog;
using Tomologo.Api.Configuration;
using Tomologo.Application.Catalog.Pricing;
using Tomologo.Infrastructure;

namespace Tomologo.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddTomologoApi(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddRouting(options => options.LowercaseUrls = true);

        services.Configure<CorsOptions>(configuration.GetSection(CorsOptions.SectionName));
        services.Configure<CatalogPricingOptions>(configuration.GetSection(CatalogPricingOptions.SectionName));
        services.AddSingleton<ICatalogPricePresenter, CatalogPricePresenter>();

        services.AddProblemDetails(options =>
        {
            options.CustomizeProblemDetails = ctx =>
            {
                ctx.ProblemDetails.Instance ??= ctx.HttpContext.Request.Path;
                ctx.ProblemDetails.Extensions["traceId"] = ctx.HttpContext.TraceIdentifier;

                if (!ctx.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment())
                {
                    return;
                }

                var error = ctx.HttpContext.Features.Get<IExceptionHandlerFeature>()?.Error;
                if (error is not null)
                {
                    ctx.ProblemDetails.Extensions["exception"] = error.ToString();
                }
            };
        });

        services.AddOpenApi("v1", options =>
        {
            options.AddDocumentTransformer((document, _, _) =>
            {
                document.Info = new OpenApiInfo
                {
                    Title = "Tomologo API",
                    Version = "v1",
                    Description =
                        "E-ticaret backend HTTP sözleşmesi. Hatalar RFC 7807 ProblemDetails biçimindedir.",
                };
                return Task.CompletedTask;
            });
        });

        services.AddCors(o =>
        {
            o.AddPolicy(TomologoCors.WebAppPolicy, policy =>
            {
                var cors = configuration.GetSection(CorsOptions.SectionName).Get<CorsOptions>() ?? new CorsOptions();
                if (cors.AllowedOrigins.Length == 0)
                {
                    throw new InvalidOperationException(
                        "Cors:AllowedOrigins boş. appsettings veya ortam değişkeni ile en az bir köken tanımlayın.");
                }

                policy.WithOrigins(cors.AllowedOrigins).AllowAnyHeader().AllowAnyMethod();
            });
        });

        services.AddTomologoInfrastructure(configuration);

        return services;
    }
}
