using Tomologo.Domain.Catalog.Models;

namespace Tomologo.Application.Catalog;

public interface IProductReadRepository
{
    Task<IReadOnlyList<Product>> ListAsync(CancellationToken cancellationToken);
    Task<Product?> GetBySlugAsync(string slug, CancellationToken cancellationToken);
    Task<IReadOnlyList<string>> GetCategorySlugsAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<Product>> ListByCategorySlugAsync(string categorySlug, CancellationToken cancellationToken);
}

