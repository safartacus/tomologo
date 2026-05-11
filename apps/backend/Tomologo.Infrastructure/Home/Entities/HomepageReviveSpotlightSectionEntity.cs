namespace Tomologo.Infrastructure.Home.Entities;

public sealed class HomepageReviveSpotlightSectionEntity
{
    public Guid Id { get; set; }

    public bool IsActive { get; set; }

    public ICollection<HomepageReviveSpotlightItemEntity> Items { get; set; } =
        new List<HomepageReviveSpotlightItemEntity>();
}
