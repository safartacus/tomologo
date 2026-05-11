import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StyledTextDivisionAtom } from '../styled-text-division/styled-text-division.atom';
import {
  CatalogCurrencyService,
  type SiteLanguageCode,
} from '../../../core/currency/catalog-currency.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [StyledTextDivisionAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="topbar">
      <div class="topbar__container">
        <app-styled-text-division-atom
          cssClass="topbar__left"
          text="ULUSLARARASI GÖNDERİM"
        />
        <div class="topbar__right">
          <button
            type="button"
            class="topbar__lang"
            [class.topbar__lang--active]="language() === 'en'"
            (click)="pickLang('en')"
            aria-label="English"
          >
            EN
          </button>
          <span class="topbar__sep">|</span>
          <button
            type="button"
            class="topbar__lang"
            [class.topbar__lang--active]="language() === 'tr'"
            (click)="pickLang('tr')"
            aria-label="Türkçe"
          >
            TR
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .topbar {
        background: #0b0b0b;
        color: #fff;
        height: 20px;
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      .topbar__container {
        max-width: 1180px;
        margin: 0 auto;
        height: 20px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .topbar__right {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .topbar__sep {
        opacity: 0.65;
      }
      button.topbar__lang {
        background: none;
        border: 0;
        padding: 0;
        margin: 0;
        font: inherit;
        color: inherit;
        letter-spacing: inherit;
        text-transform: inherit;
        cursor: pointer;
        opacity: 0.85;
      }
      button.topbar__lang:hover {
        opacity: 1;
      }
      button.topbar__lang--active {
        opacity: 1;
      }

      @media (max-width: 768px) {
        :host ::ng-deep app-styled-text-division-atom.topbar__left {
          color: #d4b876;
          font-weight: 500;
        }
      }
    `,
  ],
})
export class TopbarAtom {
  private readonly catalog = inject(CatalogCurrencyService);

  protected readonly language = this.catalog.siteLanguage;

  protected pickLang(code: SiteLanguageCode): void {
    this.catalog.setSiteLanguage(code);
  }
}
