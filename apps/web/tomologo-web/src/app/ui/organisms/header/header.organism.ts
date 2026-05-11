import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';
import { HeaderLogoMolecule } from '../../molecules/header-logo/header-logo.molecule';
import { HeaderSorumluUretimMolecule } from '../../molecules/header-sorumlu-uretim/header-sorumlu-uretim.molecule';
import { HeaderUserSpotMolecule } from '../../molecules/header-user-spot/header-user-spot.molecule';
import { HeaderUrunKategoriMolecule } from '../../molecules/header-urun-kategori/header-urun-kategori.molecule';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderLogoMolecule,
    LinkAtom,
    HeaderSorumluUretimMolecule,
    HeaderUserSpotMolecule,
    HeaderUrunKategoriMolecule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="header__container">
        <nav class="header__nav" aria-label="Ana menü">
          <app-header-urun-kategori />
          <app-link-atom cssClass="hnl" href="#" text="HİKAYEMİZ" />
          <app-header-sorumlu-uretim />
          <app-link-atom cssClass="hnl" href="#" text="BLOG" />
        </nav>

        <app-header-logo />

        <app-header-user-spot />
      </div>
    </header>
  `,
  styles: [
    `
      .header {
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        height: 80px;
      }
      .header__container {
        max-width: 1180px;
        margin: 0 auto;
        height: 80px;
        padding: 0 16px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 16px;
      }
      .header__nav {
        display: flex;
        gap: 18px;
        align-items: center;
        justify-content: flex-start;
      }
      @media (max-width: 920px) {
        .header__container {
          grid-template-columns: 1fr auto;
          grid-template-areas:
            'logo actions'
            'nav nav';
        }
        .header__nav {
          grid-area: nav;
          flex-wrap: wrap;
          gap: 12px;
        }
      }
    `,
  ],
})
export class HeaderOrganism {}

