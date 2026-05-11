namespace Tomologo.Infrastructure.Home.Entities;

public sealed class HomepageReviveSpotlightItemEntity
{
    public Guid Id { get; set; }

    public Guid SectionId { get; set; }
    public HomepageReviveSpotlightSectionEntity Section { get; set; } = null!;

    public int SortOrder { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public string Slug { get; set; } = string.Empty;
}
