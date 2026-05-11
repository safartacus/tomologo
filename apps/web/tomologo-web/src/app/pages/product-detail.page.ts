import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { catchError, combineLatest, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import {
  ProductCatalogApiService,
  type CatalogProduct,
} from '../core/api/product-catalog.api';
import { CatalogCurrencyService } from '../core/currency/catalog-currency.service';
import { MockCartStore } from '../core/store/mock-cart.store';
import { AccordionAtom } from '../ui/atoms/accordion/accordion.atom';
import { ButtonAtom } from '../ui/atoms/button-atom/button-atom.atom';
import { LinkAtom } from '../ui/atoms/link-atom/link-atom.atom';
import { formatCatalogMoney } from '../core/currency/format-catalog-money';
import { RelatedProductsCarouselOrganism } from '../ui/organisms/related-products-carousel/related-products-carousel.organism';

interface ProductDetailView {
  slug: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  colors: { name: string; hex: string }[];
}

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [AccordionAtom, ButtonAtom, LinkAtom, RelatedProductsCarouselOrganism],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="detail">
      <div class="detail__container">
        <div class="detail__breadcrumbs">
          <app-link-atom cssClass="detail__crumb" routerLink="/" text="ANA SAYFA" /> /
          <app-link-atom
            cssClass="detail__crumb"
            routerLink="/tum-urunler/mini-clutch"
            text="ÇANTA"
          />
          / {{ product().name }}
        </div>

        <div class="detail__layout">
          <div>
            <div
              class="detail__mainImage"
              [style.background-image]="'url(' + product().image + ')'"
            ></div>
            <div class="detail__thumbs">
              @for (_ of [1, 2, 3, 4]; track $index) {
                <div class="detail__thumb"></div>
              }
            </div>
          </div>

          <div class="info">
            <h1 class="info__title">{{ product().name }}</h1>
            <div class="info__price">{{ formatPrice(product().price, product().currency) }}</div>
            <p class="info__desc">
              {{ product().description }}
            </p>

            <div class="info__label">Renk:</div>
            <div class="info__colors">
              @for (color of product().colors; track color.name) {
                <button
                  type="button"
                  class="info__color"
                  [class.info__color--active]="selectedColor() === color.name"
                  [style.background]="color.hex"
                  [attr.aria-label]="color.name"
                  (click)="selectColor(color.name)"
                ></button>
              }
            </div>

            <div class="info__cta">
              <div class="qty">
                <app-button-atom cssClass="info__qtyBtn" type="button" text="-" (click)="decreaseQty()" />
                <span>{{ quantity() }}</span>
                <app-button-atom cssClass="info__qtyBtn" type="button" text="+" (click)="increaseQty()" />
              </div>
              <app-button-atom
                cssClass="addBtn"
                type="button"
                text="SEPETE EKLE"
                (click)="addToCart()"
              />
            </div>

            <app-accordion
              title="DETAYLAR"
              [lines]="detailAccordionLines"
              [initiallyOpen]="true"
            />
            <app-accordion title="MALZEME & BAKIM" [lines]="careAccordionLines" />
            <app-accordion title="BOYUT BİLGİSİ" [lines]="sizeAccordionLines" />
          </div>
        </div>
      </div>
    </section>

    <app-related-products-carousel [excludeSlug]="product().slug" />
  `,
  styles: [
    `
      .detail {
        padding: 16px 0 40px;
      }
      .detail__container {
        max-width: var(--container);
        margin: 0 auto;
        padding: 0 var(--page-pad);
      }
      .detail__breadcrumbs {
        font-size: 10px;
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 16px;
      }
      .detail__layout {
        display: grid;
        grid-template-columns: 1fr 420px;
        gap: 28px;
      }
      .detail__mainImage {
        background: #f1f1f1 center / cover no-repeat;
        aspect-ratio: 1 / 1;
      }
      .detail__thumbs {
        margin-top: 8px;
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
      }
      .detail__thumb {
        background: #efefef;
        aspect-ratio: 1 / 1;
      }
      .info__title {
        margin: 0;
        font-size: 22px;
        letter-spacing: 0.08em;
        font-weight: 400;
      }
      .info__price {
        margin-top: 8px;
        font-size: 28px;
        color: #8f825c;
      }
      .info__desc {
        margin: 12px 0 16px;
        font-size: 12px;
        color: var(--muted);
        line-height: 1.6;
      }
      .info__label {
        font-size: 11px;
        margin-bottom: 6px;
      }
      .info__colors {
        display: flex;
        gap: 7px;
        margin-bottom: 16px;
      }
      .info__color {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        border: 1px solid rgba(0, 0, 0, 0.25);
        background: #c9c5b7;
        cursor: pointer;
      }
      .info__color--active {
        outline: 2px solid #111;
        outline-offset: 1px;
      }
      .info__cta {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 14px;
      }
      .qty {
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(0, 0, 0, 0.15);
      }
      .qty span {
        width: 28px;
        height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      }
      @media (max-width: 980px) {
        .detail__layout {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class ProductDetailPage {
  protected readonly detailAccordionLines = [
    'Dana derisi, kartlık iç cep ve fermuar.',
  ];
  protected readonly careAccordionLines = ['Deri bakım önerileri ve kullanım notları.'];
  protected readonly sizeAccordionLines = ['31 x 15 cm.'];

  private readonly route = inject(ActivatedRoute);
  private readonly cartStore = inject(MockCartStore);
  private readonly catalogApi = inject(ProductCatalogApiService);
  private readonly catalogCurrency = inject(CatalogCurrencyService);

  private readonly productRaw = toSignal(
    combineLatest([
      this.route.paramMap.pipe(
        map((pm) => pm.get('slug') ?? 'mini-clutch-kemik'),
        distinctUntilChanged(),
      ),
      toObservable(this.catalogCurrency.displayCurrency),
    ]).pipe(
      switchMap(([slug]) =>
        this.catalogApi.getBySlug(slug).pipe(catchError(() => of(null as CatalogProduct | null))),
      ),
    ),
    { initialValue: null as CatalogProduct | null },
  );

  protected readonly quantity = signal(1);

  protected readonly product = computed((): ProductDetailView => {
    const p = this.productRaw();
    if (!p) {
      return {
        slug: '',
        name: 'Yükleniyor…',
        price: 0,
        currency: 'TRY',
        image: '',
        description: '',
        colors: [],
      };
    }
    return {
      slug: p.slug,
      name: p.name,
      price: p.priceAmount,
      currency: p.currency,
      image: p.image,
      description: p.description,
      colors: (p.colors ?? []).map((c) => ({ name: c.name, hex: c.hex })),
    };
  });

  protected readonly selectedColor = signal<string>('');

  constructor() {
    effect(() => {
      const raw = this.productRaw();
      if (!raw) {
        untracked(() => this.selectedColor.set(''));
        return;
      }
      const first = raw.colors?.[0]?.name;
      if (first) {
        untracked(() => this.selectedColor.set(first));
      }
    });
  }

  protected selectColor(name: string): void {
    this.selectedColor.set(name);
  }

  protected increaseQty(): void {
    this.quantity.update((q) => q + 1);
  }

  protected decreaseQty(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  protected addToCart(): void {
    this.cartStore.addItem({
      slug: this.product().slug,
      name: this.product().name,
      image: this.product().image,
      unitPrice: this.product().price,
      currency: this.product().currency,
      quantity: this.quantity(),
      color: this.selectedColor(),
    });
  }

  protected formatPrice(price: number, currency: string): string {
    return formatCatalogMoney(price, currency);
  }
}

