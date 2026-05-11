import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkAtom } from '../link-atom/link-atom.atom';
import { StyledTextDivisionAtom } from '../styled-text-division/styled-text-division.atom';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [LinkAtom, StyledTextDivisionAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="topbar">
      <div class="topbar__container">
        <app-styled-text-division-atom
          cssClass="topbar__left"
          text="ULUSLARARASI GÖNDERİM"
        />
        <div class="topbar__right">
          <app-link-atom
            cssClass="topbar__lang"
            href="#"
            text="EN"
            ariaLabel="English"
          />
          <span class="topbar__sep">|</span>
          <app-link-atom
            cssClass="topbar__lang topbar__lang--active"
            href="#"
            text="TR"
            ariaLabel="Türkçe"
          />
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
    `,
  ],
})
export class TopbarAtom {}

