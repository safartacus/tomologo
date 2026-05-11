import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductCardMolecule } from '../../molecules/product-card/product-card.molecule';

export interface CategoryProductGridItem {
  slug: string;
  name: string;
  price: string;
  image: string;
}

@Component({
  selector: 'app-category-product-grid',
  standalone: true,
  imports: [ProductCardMolecule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="categoryProductGrid" role="list">
      @for (item of items(); track item.slug) {
        <div class="categoryProductGrid__cell" role="listitem">
          <app-product-card
            [slug]="item.slug"
            [name]="item.name"
            [price]="item.price"
            [image]="item.image"
          />
        </div>
      }
    </div>
  `,
  styles: [
    `
      .categoryProductGrid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px;
      }
      .categoryProductGrid__cell {
        min-width: 0;
      }
      @media (max-width: 760px) {
        .categoryProductGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `,
  ],
})
export class CategoryProductGridOrganism {
  readonly items = input.required<CategoryProductGridItem[]>();
}
