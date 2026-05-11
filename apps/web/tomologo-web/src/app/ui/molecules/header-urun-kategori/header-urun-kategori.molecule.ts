import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';

@Component({
  selector: 'app-header-urun-kategori',
  standalone: true,
  imports: [LinkAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-link-atom
      cssClass="hurk__trigger"
      routerLink="/tum-urunler"
      ariaHaspopup="true"
      [ariaExpanded]="false"
    >
      TÜM ÜRÜNLER <span class="hurk__chev" aria-hidden="true">▾</span>
    </app-link-atom>
    <div class="hurk__mega" role="menu" aria-label="Ürün kategorileri">
      <div class="hurk__primary">
        <div class="hurk__group">
          <app-link-atom cssClass="hurk__parent" routerLink="/urun-kategori/canta" htmlRole="menuitem">
            ÇANTA
            <span class="hurk__parentChev" aria-hidden="true">›</span>
          </app-link-atom>
          <div class="hurk__flyout" role="presentation">
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/tum-urunler/mini-clutch"
              htmlRole="menuitem"
              text="MİNİ CLUTCH"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/tum-urunler/clutch"
              htmlRole="menuitem"
              text="CLUTCH"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/tum-urunler/capraz-canta"
              htmlRole="menuitem"
              text="ÇAPRAZ ÇANTA"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/tum-urunler/mini-tote"
              htmlRole="menuitem"
              text="MİNİ TOTE"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/tum-urunler/tote-canta"
              htmlRole="menuitem"
              text="TOTE ÇANTA"
            />
          </div>
        </div>
        <div class="hurk__group">
          <app-link-atom
            cssClass="hurk__parent"
            routerLink="/urun-kategori/aksesuar"
            htmlRole="menuitem"
          >
            AKSESUAR
            <span class="hurk__parentChev" aria-hidden="true">›</span>
          </app-link-atom>
          <div class="hurk__flyout" role="presentation">
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/urun-kategori/makyaj-cantasi"
              htmlRole="menuitem"
              text="MAKYAJ ÇANTASI"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/urun-kategori/cuzdan"
              htmlRole="menuitem"
              text="CÜZDAN"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/urun-kategori/fermuarli-kartlik"
              htmlRole="menuitem"
              text="FERMUARLI KARTLIK"
            />
            <app-link-atom
              cssClass="hurk__flyoutLink"
              routerLink="/urun-kategori/mini-kartlik"
              htmlRole="menuitem"
              text="MİNİ KARTLIK"
            />
          </div>
        </div>
        <div class="hurk__group hurk__group--leaf">
          <app-link-atom
            cssClass="hurk__leaf"
            routerLink="/kategori/kisisellestirme"
            htmlRole="menuitem"
            text="KİŞİSELLEŞTİRME"
          />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
      }
      .hurk__chev {
        display: inline-block;
        margin-left: 3px;
        font-size: 8px;
        opacity: 0.55;
        vertical-align: middle;
        transform: translateY(-1px);
      }
      .hurk__mega {
        position: absolute;
        left: 0;
        top: 100%;
        padding-top: 12px;
        margin-top: 0;
        display: none;
        z-index: 20;
        min-width: 200px;
        background: transparent;
        border: 0;
        box-shadow: none;
      }
      :host(:hover) .hurk__mega,
      :host(:focus-within) .hurk__mega {
        display: block;
      }
      .hurk__primary {
        padding: 4px 0 6px;
        position: relative;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 4px 12px 32px rgba(0, 0, 0, 0.08);
      }
      .hurk__group {
        position: relative;
      }
      .hurk__flyout {
        display: none;
        position: absolute;
        left: calc(100% - 1px);
        top: 0;
        min-width: 218px;
        padding: 4px 0 6px;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 8px 8px 28px rgba(0, 0, 0, 0.07);
        z-index: 21;
      }
      .hurk__group:hover .hurk__flyout {
        display: block;
      }
    `,
  ],
})
export class HeaderUrunKategoriMolecule {}
