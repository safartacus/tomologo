import { ChangeDetectionStrategy, Component, ElementRef, output, viewChild } from '@angular/core';
import { ButtonAtom } from '../button-atom/button-atom.atom';

@Component({
  selector: 'app-cart-coupon',
  standalone: true,
  imports: [ButtonAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cartCoupon">
      <input
        #codeInput
        type="text"
        class="cartCoupon__input"
        placeholder="Kupon Kodu"
        autocomplete="off"
        aria-label="Kupon kodu"
      />
      <app-button-atom
        cssClass="cartCoupon__btn"
        type="button"
        text="KUPON KULLAN"
        (click)="emitApply()"
      />
      <app-button-atom
        cssClass="cartCoupon__btn cartCoupon__btn--ghost"
        type="button"
        text="SEPETİ GÜNCELLE"
        (click)="updateCart.emit()"
      />
    </div>
  `,
  styles: [
    `
      .cartCoupon {
        margin-top: 10px;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }
      .cartCoupon__input {
        width: 170px;
        height: 30px;
        border: 1px solid rgba(0, 0, 0, 0.16);
        padding: 0 8px;
        font-size: 11px;
      }
    `,
  ],
})
export class CartCouponAtom {
  private readonly codeInput = viewChild.required<ElementRef<HTMLInputElement>>('codeInput');

  /** Kupon uygula tıklandığında girilen kod (trim) */
  readonly applyCoupon = output<string>();
  /** Sepeti güncelle tıklandığında */
  readonly updateCart = output<void>();

  protected emitApply(): void {
    const v = this.codeInput().nativeElement.value.trim();
    this.applyCoupon.emit(v);
  }
}
