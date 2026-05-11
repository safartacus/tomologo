import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Ana sayfa hero üzerindeki kırmızı kampanya şeridi. */
@Component({
  selector: 'app-home-hero-campaign-banner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isActive() && text()) {
      <div class="homeHeroCampaignBanner" role="status">
        {{ text() }}
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .homeHeroCampaignBanner {
        position: absolute;
        left: 50%;
        top: 18.85%;
        transform: translateX(-50%);
        background: rgb(255, 75, 74);
        color: #fff;
        padding: 0 12px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 31px;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 40px;
        text-transform: uppercase;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .homeHeroCampaignBanner {
          top: 17.7%;
          font-size: 18px;
          line-height: 24px;
          height: auto;
          padding: 6px 10px;
          white-space: normal;
          text-align: center;
          width: calc(100% - 32px);
        }
      }
    `,
  ],
})
export class HomeHeroCampaignBannerAtom {
  readonly isActive = input<boolean>(false);

  readonly text = input<string>('');
}
