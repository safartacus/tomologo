import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HomeHeroCampaignBannerAtom } from '../home-hero-campaign-banner/home-hero-campaign-banner.atom';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [HomeHeroCampaignBannerAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="homeHero"
      [attr.aria-label]="bannerTitle() || 'Kampanya'"
      [style.background]="heroBackground()"
    >
      <app-home-hero-campaign-banner
        [isActive]="campaignActive()"
        [text]="campaignTitle()"
      />
    </section>
  `,
  styles: [
    `
      /* Masaüstü: 1905×640; mobil: 430×932 */
      .homeHero {
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw);
        aspect-ratio: 1905 / 640;
        position: relative;
        overflow: hidden;
      }

      @media (max-width: 768px) {
        .homeHero {
          aspect-ratio: 430 / 932;
        }
      }
    `,
  ],
})
export class HomeHeroAtom {
  /** Hero arka plan görseli URL’si */
  readonly bannerUrl = input.required<string>();

  /** Erişilebilirlik / yönetim etiketi (ör. defaultBanner) */
  readonly bannerTitle = input<string>('');

  /** Kampanya şeridindeki metin */
  readonly campaignTitle = input<string>('');

  /** false ise kırmızı şerit gösterilmez (admin kampanyayı kapatabilir) */
  readonly campaignActive = input<boolean>(false);

  /** `cover` yüksekliği doldururken `center top` üst kısmı (gökyüzü vb.) korur; `center` üst–altı eşit keserdi. */
  protected readonly heroBackground = computed(
    () => `url(${JSON.stringify(this.bannerUrl())}) center top / cover no-repeat, #ddd`,
  );
}
