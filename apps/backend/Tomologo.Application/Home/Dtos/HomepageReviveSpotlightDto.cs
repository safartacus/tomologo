namespace Tomologo.Application.Home.Dtos;

public sealed class HomepageReviveSpotlightDto
{
    public bool IsActive { get; init; }

    public HomepageReviveSpotlightItemDto[] Items { get; init; } = [];
}
