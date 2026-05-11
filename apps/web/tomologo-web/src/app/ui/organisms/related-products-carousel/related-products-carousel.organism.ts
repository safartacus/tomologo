import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  input,
  signal,
} from '@angular/core';
import { MOCK_PRODUCTS } from '../../../core/data/mock-products.data';
import { ButtonAtom } from '../../atoms/button-atom/button-atom.atom';
import { ProductCardMolecule } from '../../molecules/product-card/product-card.molecule';

@Component({
  selector: 'app-related-products-carousel',
  standalone: true,
  imports: [ButtonAtom, ProductCardMolecule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (relatedProducts().length > 0) {
      <section class="related">
        <div class="related__container">
          <div class="related__heading">
            <app-button-atom
              cssClass="related__arrow"
              type="button"
              text="‹"
              ariaLabel="Önceki ürünler"
              (click)="prevRelatedPage()"
            />
            <h2 class="related__title">İLGİLİ ÜRÜNLER</h2>
            <app-button-atom
              cssClass="related__arrow"
              type="button"
              text="›"
              ariaLabel="Sonraki ürünler"
              (click)="nextRelatedPage()"
            />
          </div>
          <div class="related__line"></div>

          <div
            class="related__grid"
            (touchstart)="onRelatedTouchStart($event)"
            (touchend)="onRelatedTouchEnd($event)"
          >
            @for (product of visibleRelatedProducts(); track product.slug) {
              <app-product-card
                [name]="product.name"
                [price]="product.price"
                [image]="product.image"
                [slug]="product.slug"
              />
            }
          </div>

          @if (totalRelatedPages() > 1) {
            <div class="related__dots" aria-label="Ürün sayfalama">
              @for (dot of dotIndexes(); track dot) {
                <app-button-atom
                  [cssClass]="
                    dot === currentRelatedPage()
                      ? 'related__dot related__dot--active'
                      : 'related__dot'
                  "
                  type="button"
                  [ariaLabel]="'Sayfa ' + (dot + 1)"
                  (click)="setRelatedPage(dot)"
                />
              }
            </div>
          }
        </div>
      </section>
    }
  `,
  styles: [
    `
      .related {
        padding: 18px 0 58px;
      }
      .related__container {
        max-width: var(--container);
        margin: 0 auto;
        padding: 0 var(--page-pad);
      }
      .related__title {
        margin: 0;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 0.1em;
      }
      .related__heading {
        display: grid;
        grid-template-columns: 40px 1fr 40px;
        align-items: center;
      }
      .related__line {
        width: 34px;
        height: 2px;
        background: #d4c7a3;
        margin: 9px auto 22px;
      }
      .related__grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 20px;
      }
      .related__dots {
        margin-top: 16px;
        display: flex;
        justify-content: center;
        gap: 8px;
      }

      @media (max-width: 980px) {
        .related__grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (max-width: 640px) {
        .related__grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class RelatedProductsCarouselOrganism implements OnDestroy {
  /** Ürün detayında mevcut ürünü carousel dışında bırakmak için */
  readonly excludeSlug = input<string | undefined>(undefined);

  protected readonly relatedProducts = computed(() => {
    const ex = this.excludeSlug();
    const list = ex
      ? MOCK_PRODUCTS.filter((p) => p.slug !== ex)
      : MOCK_PRODUCTS;
    return list.map((p) => ({
      slug: p.slug,
      name: p.name,
      price: p.price.toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      image: p.image,
    }));
  });

  protected readonly currentRelatedPage = signal(0);
  private autoPlayTimer: number | undefined;
  private touchStartX = 0;

  protected readonly totalRelatedPages = computed(() => {
    const n = this.relatedProducts().length;
    return n === 0 ? 0 : Math.ceil(n / 4);
  });

  protected readonly visibleRelatedProducts = computed(() => {
    const page = this.currentRelatedPage();
    const start = page * 4;
    return this.relatedProducts().slice(start, start + 4);
  });

  protected readonly dotIndexes = computed(() =>
    Array.from({ length: this.totalRelatedPages() }, (_, i) => i),
  );

  constructor() {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  protected setRelatedPage(page: number): void {
    const max = this.totalRelatedPages();
    if (max === 0) return;
    this.currentRelatedPage.set(Math.min(page, max - 1));
    this.restartAutoPlay();
  }

  protected nextRelatedPage(): void {
    const max = this.totalRelatedPages();
    if (max === 0) return;
    const next = (this.currentRelatedPage() + 1) % max;
    this.currentRelatedPage.set(next);
    this.restartAutoPlay();
  }

  protected prevRelatedPage(): void {
    const max = this.totalRelatedPages();
    if (max === 0) return;
    const prev = (this.currentRelatedPage() - 1 + max) % max;
    this.currentRelatedPage.set(prev);
    this.restartAutoPlay();
  }

  protected onRelatedTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.clientX ?? 0;
  }

  protected onRelatedTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = touchEndX - this.touchStartX;

    if (Math.abs(deltaX) < 40) return;

    if (deltaX < 0) {
      this.nextRelatedPage();
      return;
    }
    this.prevRelatedPage();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      const max = this.totalRelatedPages();
      if (max <= 1) return;
      const next = (this.currentRelatedPage() + 1) % max;
      this.currentRelatedPage.set(next);
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer === undefined) return;
    window.clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = undefined;
  }

  private restartAutoPlay(): void {
    this.startAutoPlay();
  }
}
