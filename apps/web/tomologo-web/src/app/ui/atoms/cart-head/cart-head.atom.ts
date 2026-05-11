import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-head',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cartHead" role="row">
      <span role="columnheader">ÜRÜN</span>
      <span role="columnheader">FİYAT</span>
      <span role="columnheader">MİKTAR</span>
      <span role="columnheader">ARA TOPLAM</span>
    </div>
  `,
  styles: [
    `
      .cartHead {
        display: grid;
        grid-template-columns: 1fr 110px 90px 130px;
        align-items: center;
        font-size: 12px;
        font-weight: 600;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding-bottom: 8px;
      }

      @media (max-width: 760px) {
        .cartHead {
          display: none;
        }
      }
    `,
  ],
})
export class CartHeadAtom {}
