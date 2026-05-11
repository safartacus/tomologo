using Microsoft.EntityFrameworkCore;
using Tomologo.Application.Home.Dtos;
using Tomologo.Application.Home.Services;
using Tomologo.Infrastructure.Catalog.Persistence;

namespace Tomologo.Infrastructure.Home.Repositories;

public sealed class EfHomepageReadRepository : IHomepageReadRepository
{
    private readonly TomologoCatalogDbContext _db;

    public EfHomepageReadRepository(TomologoCatalogDbContext db)
    {
        _db = db;
    }

    public async Task<HomepageResponseDto?> GetAsync(CancellationToken cancellationToken = default)
    {
        var campaign = await _db.HomepageCampaigns.AsNoTracking().FirstOrDefaultAsync(cancellationToken);
        var banner = await _db.HomepageBanners.AsNoTracking().FirstOrDefaultAsync(cancellationToken);
        var section = await _db.HomepageReviveSpotlightSections
            .AsNoTracking()
            .Include(s => s.Items)
            .FirstOrDefaultAsync(cancellationToken);
        var story = await _db.HomepageReviveStories.AsNoTracking().FirstOrDefaultAsync(cancellationToken);

        if (campaign is null || banner is null || section is null || story is null)
        {
            return null;
        }

        var items = section.Items
            .OrderBy(i => i.SortOrder)
            .Select(
                i => new HomepageReviveSpotlightItemDto
                {
                    Name = i.Name,
                    Image = i.Image,
                    Slug = i.Slug,
                })
            .ToArray();

        return new HomepageResponseDto
        {
            Campaign = new HomepageCampaignDto
            {
                Title = campaign.Title,
                IsActive = campaign.IsActive,
                CampaignName = campaign.CampaignName,
            },
            Banner = new HomepageBannerDto
            {
                BannerTitle = banner.BannerTitle,
                Url = banner.Url,
            },
            ReviveSpotlight = new HomepageReviveSpotlightDto
            {
                IsActive = section.IsActive,
                Items = items,
            },
            ReviveStory = new HomepageReviveStoryDto
            {
                IsActive = story.IsActive,
                Text = story.Text,
            },
        };
    }
}
