import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockCartStore } from '../../../core/store/mock-cart.store';
import { ButtonAtom } from '../../atoms/button-atom/button-atom.atom';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';

@Component({
  selector: 'app-header-user-spot',
  standalone: true,
  imports: [RouterLink, ButtonAtom, LinkAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-link-atom cssClass="hus__auth" href="#" text="Giriş Yap / Kayıt Ol" />
    <span class="hus__rule" aria-hidden="true"></span>
    <app-button-atom cssClass="hus__icon" type="button" ariaLabel="Ara">
      <span class="hus__glyph" aria-hidden="true">⌕</span>
    </app-button-atom>

    <div class="hus__cartWrap">
      <a
        class="hus__icon hus__icon--cart"
        routerLink="/sepet"
        aria-label="Sepet"
        aria-haspopup="true"
      >
        <span class="hus__glyph" aria-hidden="true">🛒</span>
        @if (cartCount() > 0) {
          <span class="hus__badge">{{ cartCount() }}</span>
        }
      </a>
      <div class="hus__miniCart" role="region" aria-label="Sepet özeti">
        <div class="hus__miniPanel">
          @if (items().length === 0) {
            <p class="hus__miniEmpty">Sepetiniz boş.</p>
          } @else {
            <ul class="hus__miniList">
              @for (item of items(); track item.id) {
                <li class="hus__miniLine">
                  <div
                    class="hus__miniThumb"
                    [style.background-image]="'url(' + item.image + ')'"
                    role="img"
                    [attr.aria-label]="item.name"
                  ></div>
                  <div class="hus__miniMeta">
                    <div class="hus__miniName">{{ item.name }}</div>
                    <div class="hus__miniQty">
                      {{ item.quantity }} × {{ formatTry(item.unitPrice) }}
                    </div>
                  </div>
                  <button
                    type="button"
                    class="hus__miniRemove"
                    (click)="onRemoveLine($event, item.id)"
                    aria-label="Ürünü kaldır"
                  >
                    ×
                  </button>
                </li>
              }
            </ul>
          }
          <div class="hus__miniSub">
            <span>Ara toplam</span>
            <strong>{{ formatTry(subTotal()) }}</strong>
          </div>
          <div class="hus__miniActions">
            <app-link-atom
              cssClass="hus__miniBtn hus__miniBtn--ghost"
              routerLink="/sepet"
              text="SEPETİM"
            />
            <app-link-atom
              cssClass="hus__miniBtn hus__miniBtn--primary"
              routerLink="/sepet"
              text="ÖDEME"
            />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
      }
      .hus__rule {
        width: 1px;
        height: 20px;
        align-self: center;
        flex-shrink: 0;
        background: rgba(0, 0, 0, 0.14);
      }
      .hus__icon {
        width: 34px;
        height: 34px;
        border: 0;
        background: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-decoration: none;
        color: #111;
        opacity: 0.9;
        position: relative;
        font-size: 16px;
        line-height: 1;
      }
      a.hus__icon:hover {
        opacity: 1;
      }
      .hus__glyph {
        font-size: 16px;
        line-height: 1;
      }
      .hus__badge {
        position: absolute;
        right: -2px;
        top: -2px;
        min-width: 16px;
        height: 16px;
        border-radius: 999px;
        background: #8f825c;
        color: #fff;
        font-size: 9px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 4px;
      }
      .hus__cartWrap {
        position: relative;
        display: inline-flex;
        align-items: center;
      }
      .hus__miniCart {
        position: absolute;
        top: 100%;
        right: 0;
        padding-top: 10px;
        display: none;
        z-index: 50;
        min-width: 300px;
        max-width: min(340px, 92vw);
        background: transparent;
      }
      .hus__cartWrap:hover .hus__miniCart,
      .hus__cartWrap:focus-within .hus__miniCart {
        display: block;
      }
      .hus__miniPanel {
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 10px 36px rgba(0, 0, 0, 0.12);
        padding: 12px 0 14px;
      }
      .hus__miniEmpty {
        margin: 0;
        padding: 8px 14px 12px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.62);
      }
      .hus__miniList {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: min(320px, 50vh);
        overflow-y: auto;
      }
      .hus__miniLine {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        padding: 10px 14px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }
      .hus__miniThumb {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
        background: #efefef center / cover no-repeat;
      }
      .hus__miniMeta {
        flex: 1;
        min-width: 0;
      }
      .hus__miniName {
        font-size: 10px;
        letter-spacing: 0.04em;
        line-height: 1.35;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.78);
      }
      .hus__miniQty {
        margin-top: 6px;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.55);
      }
      .hus__miniRemove {
        border: 0;
        background: transparent;
        color: rgba(0, 0, 0, 0.45);
        cursor: pointer;
        font-size: 18px;
        line-height: 1;
        padding: 0 0 0 4px;
      }
      .hus__miniRemove:hover {
        color: #111;
      }
      .hus__miniSub {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding: 12px 14px 4px;
        font-size: 11px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.65);
      }
      .hus__miniSub strong {
        font-size: 12px;
        color: #111;
      }
      .hus__miniActions {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 12px 14px 0;
      }
      @media (max-width: 920px) {
        :host {
          grid-area: actions;
        }
      }
    `,
  ],
})
export class HeaderUserSpotMolecule {
  private readonly cartStore = inject(MockCartStore);
  private readonly money = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
  });

  protected readonly items = this.cartStore.items;
  protected readonly subTotal = this.cartStore.subTotal;
  protected readonly cartCount = this.cartStore.totalQuantity;

  protected formatTry(value: number): string {
    return this.money.format(value);
  }

  protected onRemoveLine(ev: Event, id: string): void {
    ev.preventDefault();
    ev.stopPropagation();
    this.cartStore.remove(id);
  }
}
