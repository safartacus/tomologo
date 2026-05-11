namespace Tomologo.Application.Home.Dtos;

/// <summary>GET /api/homepage yanıtı — içerik <c>homepage_*</c> tablolarından okunur.</summary>
public sealed class HomepageResponseDto
{
    public HomepageCampaignDto Campaign { get; init; } = new();

    public HomepageBannerDto Banner { get; init; } = new();

    public HomepageReviveSpotlightDto ReviveSpotlight { get; init; } = new();

    public HomepageReviveStoryDto ReviveStory { get; init; } = new();
}
