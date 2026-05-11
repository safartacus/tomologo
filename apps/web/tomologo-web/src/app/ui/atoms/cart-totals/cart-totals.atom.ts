import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonAtom } from '../button-atom/button-atom.atom';

@Component({
  selector: 'app-cart-totals',
  standalone: true,
  imports: [ButtonAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="cartTotals" aria-label="Sepet toplamları">
      <h2 class="cartTotals__title">SEPET TOPLAMLARI</h2>
      <div class="cartTotals__line">
        <span>Ara Toplam</span><strong>{{ subTotalLabel() }}</strong>
      </div>
      <div class="cartTotals__line">
        <span>Gönderim</span><span>{{ shippingHint() }}</span>
      </div>
      <div class="cartTotals__line cartTotals__line--total">
        <span>TOPLAM</span><strong>{{ totalLabel() }}</strong>
      </div>
      <app-button-atom
        cssClass="cartTotals__checkout"
        type="button"
        text="ÖDEME SAYFASINA GİT"
        (click)="checkout.emit()"
      />
    </aside>
  `,
  styles: [
    `
      .cartTotals {
        border: 1px solid rgba(0, 0, 0, 0.08);
        padding: 14px;
      }
      .cartTotals__title {
        margin: 0 0 10px;
        font-size: 16px;
        letter-spacing: 0.08em;
      }
      .cartTotals__line {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.72);
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
      .cartTotals__line--total {
        color: #111;
        font-size: 13px;
      }
    `,
  ],
})
export class CartTotalsAtom {
  /** Ara toplam / genel ara tutar (TRY) */
  readonly subTotal = input.required<number>();
  /** TOPLAM satırı; verilmezse ara toplam ile aynı gösterilir */
  readonly orderTotal = input<number | undefined>(undefined);
  /** Gönderim açıklama metni */
  readonly shippingHint = input<string>('Ödeme adımında hesaplanır');

  readonly checkout = output<void>();

  private readonly formatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  });

  protected readonly subTotalLabel = computed(() => this.formatter.format(this.subTotal()));

  protected readonly totalLabel = computed(() => {
    const t = this.orderTotal();
    const n = t === undefined || t === null ? this.subTotal() : t;
    return this.formatter.format(n);
  });
}
