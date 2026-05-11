import { ChangeDetectionStrategy, Component, Input, output } from '@angular/core';
import { formatCatalogMoney } from '../../../core/currency/format-catalog-money';
import { CartItem } from '../../../core/store/mock-cart.store';
import { ButtonAtom } from '../../atoms/button-atom/button-atom.atom';

@Component({
  selector: 'app-cart-line',
  standalone: true,
  imports: [ButtonAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cartLine" role="row">
      <div class="cartLine__product">
        <app-button-atom
          cssClass="cartLine__remove"
          type="button"
          text="×"
          ariaLabel="Ürünü kaldır"
          (click)="removeLine.emit(item.id)"
        />
        <div
          class="cartLine__thumb"
          [style.background-image]="'url(' + item.image + ')'"
        ></div>
        <div>
          <div class="cartLine__name">{{ item.name }}</div>
          @if (item.color) {
            <div class="cartLine__variant">{{ item.color }}</div>
          }
        </div>
      </div>
      <div>{{ formatMoney(item.unitPrice) }}</div>
      <div class="cartLine__qtyCtrls">
        <app-button-atom
          cssClass="cartLine__qtyBtn"
          type="button"
          text="-"
          (click)="decreaseQty.emit(item.id)"
        />
        <span class="cartLine__qty">{{ item.quantity }}</span>
        <app-button-atom
          cssClass="cartLine__qtyBtn"
          type="button"
          text="+"
          (click)="increaseQty.emit(item.id)"
        />
      </div>
      <div class="cartLine__subtotal">{{ formatMoney(item.unitPrice * item.quantity) }}</div>
    </div>
  `,
  styles: [
    `
      .cartLine {
        display: grid;
        grid-template-columns: 1fr 110px 90px 130px;
        align-items: center;
        font-size: 12px;
        min-height: 86px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }
      .cartLine__product {
        display: grid;
        grid-template-columns: 20px 56px 1fr;
        gap: 8px;
        align-items: center;
      }
      .cartLine__thumb {
        width: 56px;
        height: 56px;
        background: #efefef center / cover no-repeat;
      }
      .cartLine__name {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.75);
      }
      .cartLine__variant {
        margin-top: 4px;
        font-size: 10px;
        color: rgba(0, 0, 0, 0.55);
      }
      .cartLine__qtyCtrls {
        display: inline-flex;
        align-items: center;
      }
      .cartLine__qty {
        width: 36px;
        height: 26px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .cartLine__subtotal {
        font-weight: 600;
      }

      @media (max-width: 760px) {
        .cartLine {
          grid-template-columns: 1fr;
          padding: 12px 0;
          gap: 8px;
        }
      }
    `,
  ],
})
export class CartLineMolecule {
  @Input({ required: true }) item!: CartItem;

  readonly removeLine = output<string>();
  readonly increaseQty = output<string>();
  readonly decreaseQty = output<string>();

  protected formatMoney(value: number): string {
    return formatCatalogMoney(value, this.item.currency ?? 'TRY');
  }
}
