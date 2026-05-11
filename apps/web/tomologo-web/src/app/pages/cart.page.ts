import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MockCartStore } from '../core/store/mock-cart.store';
import { CartHeadAtom } from '../ui/atoms/cart-head/cart-head.atom';
import { CartLineMolecule } from '../ui/molecules/cart-line/cart-line.molecule';
import { CartCouponAtom } from '../ui/atoms/cart-coupon/cart-coupon.atom';
import { CartTotalsAtom } from '../ui/atoms/cart-totals/cart-totals.atom';
import { StyledTextDivisionAtom } from '../ui/atoms/styled-text-division/styled-text-division.atom';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CartCouponAtom, CartHeadAtom, CartLineMolecule, CartTotalsAtom, StyledTextDivisionAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cart">
      <div class="cart__container">
        <app-styled-text-division-atom
          cssClass="cart__notice"
          text="Uluslararası gönderilerde gümrük vergisi tutarı dahil değildir ve Euro fiyatlar geçerlidir."
        />

        <div class="cart__layout">
          <div>
            <app-cart-head />
            @if (items().length === 0) {
              <app-styled-text-division-atom cssClass="cart__empty" text="Sepetiniz boş." />
            } @else {
              @for (item of items(); track item.id) {
                <app-cart-line
                  [item]="item"
                  (removeLine)="remove($event)"
                  (increaseQty)="increase($event)"
                  (decreaseQty)="decrease($event)"
                />
              }
            }
            <app-cart-coupon />
          </div>

          <app-cart-totals [subTotal]="subTotal()" [currencyCode]="totalsCurrency()" />
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .cart {
        padding: 16px 0 40px;
      }
      .cart__container {
        max-width: var(--container);
        margin: 0 auto;
        padding: 0 var(--page-pad);
      }
      .cart__notice {
        background: #eef6e8;
        color: rgba(0, 0, 0, 0.65);
        font-size: 11px;
        padding: 8px 12px;
        margin-bottom: 16px;
      }
      .cart__layout {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 18px;
        align-items: start;
      }
      .cart__empty {
        padding: 16px 0;
        font-size: 12px;
        color: var(--muted);
      }
      @media (max-width: 980px) {
        .cart__layout {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class CartPage {
  private readonly cartStore = inject(MockCartStore);
  protected readonly items = this.cartStore.items;
  protected readonly subTotal = this.cartStore.subTotal;

  /** Tek para birimi varsayımı; karışık sepet ileride ayrı ele alınmalı. */
  protected readonly totalsCurrency = computed(
    () => this.items()[0]?.currency ?? 'TRY',
  );

  protected increase(id: string): void {
    this.cartStore.increase(id);
  }

  protected decrease(id: string): void {
    this.cartStore.decrease(id);
  }

  protected remove(id: string): void {
    this.cartStore.remove(id);
  }
}

