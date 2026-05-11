using Scalar.AspNetCore;
using Tomologo.Api.Configuration;
using Tomologo.Api.Endpoints;

namespace Tomologo.Api.Extensions;

public static class WebApplicationExtensions
{
    public static WebApplication UseTomologoPipeline(this WebApplication app)
    {
        app.UseExceptionHandler();
        app.UseStatusCodePages();

        if (app.Environment.IsProduction())
        {
            app.UseHttpsRedirection();
        }

        app.UseCors(TomologoCors.WebAppPolicy);

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference();
        }

        return app;
    }

    public static WebApplication MapTomologoEndpoints(this WebApplication app)
    {
        app.MapHealthEndpoints();
        app.MapHomepageEndpoints();
        app.MapProductsEndpoints();
        app.MapCategoriesEndpoints();
        return app;
    }
}
