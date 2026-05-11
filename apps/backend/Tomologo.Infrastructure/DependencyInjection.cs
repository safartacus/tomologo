using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Tomologo.Application.Catalog;
using Tomologo.Application.Home.Services;
using Tomologo.Infrastructure.Catalog.Persistence;
using Tomologo.Infrastructure.Catalog.Repositories;
using Tomologo.Infrastructure.Home.Repositories;

namespace Tomologo.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddTomologoInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("TomologoDatabase");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InvalidOperationException(
                "ConnectionStrings:TomologoDatabase bulunamadı. PostgreSQL bağlantı string'i ekleyin.");
        }

        services.AddDbContext<TomologoCatalogDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IProductReadRepository, EfProductReadRepository>();
        services.AddScoped<IHomepageReadRepository, EfHomepageReadRepository>();
        return services;
    }
}

