import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-logo',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="hlog" routerLink="/" [attr.aria-label]="ariaLabel">
      <img class="hlog__img" [src]="src" [alt]="alt" decoding="async" />
    </a>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .hlog {
        justify-self: center;
        text-decoration: none;
        color: #111;
        text-align: center;
        display: flex;
        align-items: center;
      }
      .hlog__img {
        height: 44px;
        width: auto;
        max-width: min(200px, 38vw);
        object-fit: contain;
        display: block;
      }
      @media (max-width: 920px) {
        .hlog {
          grid-area: logo;
          justify-self: start;
          text-align: left;
        }
        .hlog__img {
          max-width: min(180px, 52vw);
        }
      }
    `,
  ],
})
export class HeaderLogoMolecule {
  @Input() src =
    'https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-logo-1.png';
  @Input() alt = 'Tomologo İstanbul';
  @Input() ariaLabel = 'Tomologo ana sayfa';
}
