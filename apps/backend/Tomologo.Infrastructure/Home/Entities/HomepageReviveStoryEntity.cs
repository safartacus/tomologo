namespace Tomologo.Infrastructure.Home.Entities;

public sealed class HomepageReviveStoryEntity
{
    public Guid Id { get; set; }

    public bool IsActive { get; set; }

    public string Text { get; set; } = string.Empty;
}
