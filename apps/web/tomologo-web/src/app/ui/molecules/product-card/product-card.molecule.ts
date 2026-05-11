import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [LinkAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="product-card">
      @if (slug) {
        <app-link-atom cssClass="product-card__imageLink" [routerLink]="['/urun', slug]">
          <div
            class="product-card__image"
            [style.background-image]="'url(' + image + ')'"
          ></div>
        </app-link-atom>
        <app-link-atom cssClass="product-card__name" [routerLink]="['/urun', slug]" [text]="name" />
      } @else {
        <div
          class="product-card__image"
          [style.background-image]="'url(' + image + ')'"
        ></div>
        <div class="product-card__name">{{ name }}</div>
      }
      <div class="product-card__price">₺{{ price }}</div>
    </article>
  `,
  styles: [
    `
      .product-card {
        text-align: center;
      }
      .product-card__image {
        width: 100%;
        aspect-ratio: 1 / 1;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: #f1f1f1;
      }
      .product-card__price {
        margin-top: 6px;
        color: #8f825c;
        font-size: 18px;
      }
    `,
  ],
})
export class ProductCardMolecule {
  @Input({ required: true }) name = '';
  @Input({ required: true }) price = '';
  @Input({ required: true }) image = '';
  @Input() slug?: string;
}
