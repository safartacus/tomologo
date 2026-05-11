using Tomologo.Api.Extensions;
using Tomologo.Infrastructure.Catalog.Persistence;
using Tomologo.Infrastructure.Home.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTomologoApi(builder.Configuration);

var app = builder.Build();

app.UseTomologoPipeline();
app.MapTomologoEndpoints();

// MVP: migration kullanmadan tabloları otomatik oluştur; seed verisi slug ile upsert edilir.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TomologoCatalogDbContext>();
    db.Database.EnsureCreated();
    await CatalogProductSeeder.EnsureColorsColumnAsync(db);
    await CatalogProductSeeder.EnsureNormalizedCatalogSchemaAsync(db);
    await CatalogProductSeeder.SeedAsync(db);
    await HomepageContentSeeder.EnsureSchemaAsync(db);
    await HomepageContentSeeder.SeedIfEmptyAsync(db);
}

app.Run();
