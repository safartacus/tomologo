namespace Tomologo.Application.Home.Dtos;

/// <summary>Ana sayfa kampanya şeridi; <see cref="IsActive"/> false ise vitrinde gösterilmez.</summary>
public sealed class HomepageCampaignDto
{
    public string Title { get; init; } = string.Empty;

    public bool IsActive { get; init; }

    public string CampaignName { get; init; } = string.Empty;
}
