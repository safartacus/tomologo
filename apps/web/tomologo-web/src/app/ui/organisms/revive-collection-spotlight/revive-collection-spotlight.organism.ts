import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { HomepageReviveSpotlightItem } from '../../../core/api/homepage.api';
import { ReviveSpotlightTileMolecule } from '../../molecules/revive-spotlight-tile/revive-spotlight-tile.molecule';

@Component({
  selector: 'app-revive-collection-spotlight',
  standalone: true,
  imports: [ReviveSpotlightTileMolecule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="reviveSpotlight">
      <div class="reviveSpotlight__intro">
        <h2 class="reviveSpotlight__title">REVIVE KOLEKSİYONUNU KEŞFET!</h2>
        <p class="reviveSpotlight__desc">
          Revive koleksiyonunu, doğaya olan derin saygımız ve atık deri israfını önleyecek olan
          kararlılığımız oluşturuyor.
        </p>
      </div>

      <div class="reviveSpotlight__grid">
        @for (item of items(); track item.slug) {
          <app-revive-spotlight-tile
            [name]="item.name"
            [image]="item.image"
            [productSlug]="item.slug"
          />
        }
      </div>
    </section>
  `,
  styles: [
    `
      .reviveSpotlight {
        display: block;
        width: 100%;
      }
      .reviveSpotlight__intro {
        max-width: 920px;
        margin: 0 auto;
        padding: 0 var(--page-pad);
        text-align: center;
      }
      .reviveSpotlight__title {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }
      .reviveSpotlight__desc {
        margin: 12px 0 0;
        font-size: 12px;
        color: var(--muted);
        line-height: 1.6;
      }
      .reviveSpotlight__grid {
        margin-top: 22px;
        width: 100%;
        padding: 0 clamp(10px, 2vw, 28px);
        padding-bottom: 28px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: clamp(14px, 2.2vw, 32px);
        align-items: start;
      }

      @media (max-width: 980px) {
        .reviveSpotlight__grid {
          grid-template-columns: 1fr;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
      }
    `,
  ],
})
export class ReviveCollectionSpotlightOrganism {
  readonly items = input.required<HomepageReviveSpotlightItem[]>();
}
