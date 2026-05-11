using Tomologo.Application.Home.Dtos;

namespace Tomologo.Application.Home.Services;

public interface IHomepageReadRepository
{
    Task<HomepageResponseDto?> GetAsync(CancellationToken cancellationToken = default);
}
