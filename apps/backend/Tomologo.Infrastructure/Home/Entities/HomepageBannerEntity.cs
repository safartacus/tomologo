namespace Tomologo.Infrastructure.Home.Entities;

public sealed class HomepageBannerEntity
{
    public Guid Id { get; set; }

    public string BannerTitle { get; set; } = string.Empty;

    public string Url { get; set; } = string.Empty;
}
