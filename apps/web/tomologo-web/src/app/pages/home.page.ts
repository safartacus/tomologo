import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    <app-home-hero />

    <section class="section">
      <app-revive-collection-spotlight />
      <app-revive-story-announcement />
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
export class HomePage {}
