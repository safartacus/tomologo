import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbAtom } from '../ui/atoms/breadcrumb/breadcrumb.atom';
import { ButtonAtom } from '../ui/atoms/button-atom/button-atom.atom';
import { LinkAtom } from '../ui/atoms/link-atom/link-atom.atom';
import { StyledTextDivisionAtom } from '../ui/atoms/styled-text-division/styled-text-division.atom';
import { PaginationDescAtom } from '../ui/atoms/pagination-desc/pagination-desc.atom';
import { CategoryProductGridOrganism } from '../ui/organisms/category-product-grid/category-product-grid.organism';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MockCartStore } from '../core/store/mock-cart.store';
import { MOCK_PRODUCTS, formatTry } from '../core/data/mock-products.data';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    BreadcrumbAtom,
    ButtonAtom,
    CategoryProductGridOrganism,
    LinkAtom,
    PaginationDescAtom,
    StyledTextDivisionAtom,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="category">
      <div class="category__container">
        <div class="category__toolbar">
          <app-breadcrumb [items]="breadcrumbItems()" />
          <app-pagination-desc [total]="products().length" />
          <app-button-atom cssClass="category__filter" type="button" text="Filtreler +" />
        </div>

        <div class="category__layout">
          <app-category-product-grid [items]="products()" />

          <aside class="mini-cart">
            @if (firstCartItem()) {
              <div class="mini-cart__item">
                <div
                  class="mini-cart__thumb"
                  [style.background-image]="'url(' + firstCartItem()!.image + ')'"
                ></div>
                <div>
                  <div class="mini-cart__name">{{ firstCartItem()!.name }}</div>
                  @if (firstCartItem()!.color) {
                    <div class="mini-cart__variant">{{ firstCartItem()!.color }}</div>
                  }
                  <div class="mini-cart__price">{{ formatMoney(firstCartItem()!.unitPrice) }}</div>
                </div>
              </div>
            } @else {
              <app-styled-text-division-atom cssClass="mini-cart__empty" text="Sepetiniz boş." />
            }
            <div class="mini-cart__totals">
              <span>Ara Toplam</span>
              <strong>{{ formatMoney(subTotal()) }}</strong>
            </div>
            <app-link-atom
              cssClass="mini-cart__btn mini-cart__btn--outline"
              routerLink="/sepet"
              text="SEPETİM"
            />
            <app-link-atom cssClass="mini-cart__btn" routerLink="/sepet" text="ÖDEME" />
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .category {
        padding: 20px 0 48px;
      }
      .category__container {
        max-width: var(--container);
        margin: 0 auto;
        padding: 0 var(--page-pad);
      }
      .category__toolbar {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 16px;
        align-items: center;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.72);
        margin-bottom: 14px;
      }
      .category__layout {
        display: grid;
        grid-template-columns: 1fr 220px;
        gap: 20px;
        align-items: start;
      }
      .mini-cart {
        border-left: 1px solid rgba(0, 0, 0, 0.08);
        padding-left: 14px;
        font-size: 11px;
      }
      .mini-cart__item {
        display: grid;
        grid-template-columns: 42px 1fr;
        gap: 8px;
        margin-bottom: 12px;
      }
      .mini-cart__thumb {
        width: 42px;
        height: 42px;
        background: #ececec center / cover no-repeat;
      }
      .mini-cart__name {
        font-weight: 500;
      }
      .mini-cart__variant {
        color: rgba(0, 0, 0, 0.6);
      }
      .mini-cart__price {
        color: #8f825c;
      }
      .mini-cart__totals {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
      }
      .mini-cart__empty {
        color: rgba(0, 0, 0, 0.6);
        margin-bottom: 10px;
      }
      @media (max-width: 980px) {
        .category__layout {
          grid-template-columns: 1fr;
        }
        .mini-cart {
          border-left: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding-left: 0;
          padding-top: 14px;
        }
      }
    `,
  ],
})
export class CategoryPage {
  private readonly route = inject(ActivatedRoute);
  private readonly cartStore = inject(MockCartStore);

  private readonly catalogScope = toSignal(
    this.route.data.pipe(
      map((d) => (d['catalogScope'] as 'all' | 'category' | undefined) ?? 'category'),
    ),
    {
      initialValue:
        (this.route.snapshot.data['catalogScope'] as 'all' | 'category' | undefined) ??
        'category',
    },
  );

  private readonly slugParam = toSignal(
    this.route.paramMap.pipe(map((pm) => pm.get('slug'))),
    { initialValue: this.route.snapshot.paramMap.get('slug') },
  );

  protected readonly firstCartItem = computed(() => this.cartStore.items()[0]);
  protected readonly subTotal = this.cartStore.subTotal;

  protected readonly categorySlug = computed(
    () => this.slugParam() ?? 'mini-clutch',
  );

  protected readonly breadcrumbItems = computed(() => {
    if (this.catalogScope() === 'all') {
      return [
        { label: 'Ana Sayfa', link: '/' },
        { label: 'Tüm Ürünler' },
      ];
    }
    const slug = this.categorySlug();
    const title = slug
      .split('-')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
    return [
      { label: 'Ana Sayfa', link: '/' },
      { label: title },
    ];
  });

  protected readonly products = computed(() => {
    const list =
      this.catalogScope() === 'all'
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter((p) => p.category === this.categorySlug());
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

  protected formatMoney(value: number): string {
    return formatTry(value);
  }
}

