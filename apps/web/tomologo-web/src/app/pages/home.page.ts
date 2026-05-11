import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import {
  DEFAULT_HOMEPAGE_RESPONSE,
  HomepageApiService,
} from '../core/api/homepage.api';
import { HomeHeroAtom } from '../ui/atoms/home-hero/home-hero.atom';
import { ReviveCollectionSpotlightOrganism } from '../ui/organisms/revive-collection-spotlight/revive-collection-spotlight.organism';
import { ReviveStoryAnnouncementAtom } from '../ui/atoms/revive-story-announcement/revive-story-announcement.atom';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HomeHeroAtom,
    ReviveCollectionSpotlightOrganism,
    ReviveStoryAnnouncementAtom,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-home-hero
      [bannerUrl]="vm().banner.url"
      [bannerTitle]="vm().banner.bannerTitle"
      [campaignTitle]="vm().campaign.title"
      [campaignActive]="vm().campaign.isActive"
    />

    <section class="section">
      @if (vm().reviveSpotlight.isActive && vm().reviveSpotlight.items.length > 0) {
        <app-revive-collection-spotlight [items]="vm().reviveSpotlight.items" />
      }
      <app-revive-story-announcement
        [isActive]="vm().reviveStory.isActive"
        [text]="vm().reviveStory.text"
      />
    </section>
  `,
  styles: [
    `
      .section {
        padding: 42px 0 0;
      }
    `,
  ],
})
export class HomePage {
  private readonly homepageApi = inject(HomepageApiService);

  /** GET /api/homepage; hata veya boş yanıtta yerel varsayılan. */
  protected readonly vm = toSignal(
    this.homepageApi.getHomepage().pipe(catchError(() => of(DEFAULT_HOMEPAGE_RESPONSE))),
    { initialValue: DEFAULT_HOMEPAGE_RESPONSE },
  );
}
