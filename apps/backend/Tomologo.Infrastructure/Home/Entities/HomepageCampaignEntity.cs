namespace Tomologo.Infrastructure.Home.Entities;

public sealed class HomepageCampaignEntity
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public bool IsActive { get; set; }

    public string CampaignName { get; set; } = string.Empty;
}
