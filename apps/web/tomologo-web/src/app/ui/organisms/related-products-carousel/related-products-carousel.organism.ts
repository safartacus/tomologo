import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, switchMap } from 'rxjs';
import {
  ProductCatalogApiService,
  type CatalogProduct,
} from '../../../core/api/product-catalog.api';
import { CatalogCurrencyService } from '../../../core/currency/catalog-currency.service';
import { formatCatalogMoney } from '../../../core/currency/format-catalog-money';
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
            <h2 class="related__title">İLGİLİ ÜRÜNLER</h2>
          </div>
          <div class="related__line"></div>

          <div
            class="related__carousel"
            (touchstart)="onRelatedTouchStart($event)"
            (touchend)="onRelatedTouchEnd($event)"
          >
            <app-button-atom
              cssClass="related__arrow related__arrow--side"
              type="button"
              text="‹"
              ariaLabel="Önceki ürünler"
              (click)="prevRelatedPage()"
            />
            <div class="related__grid">
              @for (product of visibleRelatedProducts(); track product.slug) {
                <app-product-card
                  [name]="product.name"
                  [price]="product.price"
                  [image]="product.image"
                  [slug]="product.slug"
                  [soldOut]="product.soldOut"
                />
              }
            </div>
            <app-button-atom
              cssClass="related__arrow related__arrow--side"
              type="button"
              text="›"
              ariaLabel="Sonraki ürünler"
              (click)="nextRelatedPage()"
            />
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
        display: block;
      }
      .related__line {
        width: 34px;
        height: 2px;
        background: #d4c7a3;
        margin: 9px auto 22px;
      }
      .related__carousel {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4px;
        width: 100%;
      }
      .related__grid {
        flex: 1 1 0;
        min-width: 0;
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

  private readonly catalogApi = inject(ProductCatalogApiService);
  private readonly catalogCurrency = inject(CatalogCurrencyService);

  private readonly allProducts = toSignal(
    toObservable(this.catalogCurrency.displayCurrency).pipe(
      switchMap(() => this.catalogApi.listAll().pipe(catchError(() => of([] as CatalogProduct[])))),
    ),
    { initialValue: [] as CatalogProduct[] },
  );

  protected readonly relatedProducts = computed(() => {
    const ex = this.excludeSlug();
    const list = ex
      ? this.allProducts().filter((p) => p.slug !== ex)
      : this.allProducts();
    return list.map((p) => ({
      slug: p.slug,
      name: p.name,
      price: formatCatalogMoney(p.priceAmount, p.currency),
      image: p.image,
      soldOut: p.quantityOnHand - p.quantityReserved <= 0,
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
