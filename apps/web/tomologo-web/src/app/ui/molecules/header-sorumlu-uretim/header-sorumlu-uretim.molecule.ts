import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';

@Component({
  selector: 'app-header-sorumlu-uretim',
  standalone: true,
  imports: [LinkAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-link-atom
      cssClass="hsu__trigger"
      href="#"
      ariaHaspopup="true"
      [ariaExpanded]="false"
    >
      SORUMLU ÜRETİM <span class="hsu__chev" aria-hidden="true">▾</span>
    </app-link-atom>
    <div class="hsu__dropdown">
      <div class="hsu__col">
        <app-link-atom cssClass="hsu__colLink" href="#" text="SORUMLULUĞUMUZ" />
        <app-link-atom cssClass="hsu__colLink" href="#" text="SINIRLARIMIZ" />
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: block;
      }
      .hsu__chev {
        display: inline-block;
        margin-left: 3px;
        font-size: 8px;
        opacity: 0.55;
        vertical-align: middle;
        transform: translateY(-1px);
      }
      .hsu__dropdown {
        position: absolute;
        left: 0;
        top: 100%;
        padding-top: 12px;
        display: none;
        grid-template-columns: 1fr;
        min-width: 170px;
        z-index: 10;
        background: transparent;
        border: 0;
      }
      .hsu__col {
        padding: 8px 0;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.08);
      }
      :host(:hover) .hsu__dropdown,
      :host(:focus-within) .hsu__dropdown {
        display: grid;
      }
    `,
  ],
})
export class HeaderSorumluUretimMolecule {}
