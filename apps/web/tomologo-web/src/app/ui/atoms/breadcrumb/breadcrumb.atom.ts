import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { LinkAtom } from '../link-atom/link-atom.atom';

export interface BreadcrumbAtomItem {
  label: string;
  /** Varsa `routerLink` ile bağlanır; yoksa son düğüm (mevcut sayfa) olarak gösterilir */
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [LinkAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="breadcrumb" [attr.aria-label]="ariaLabel()">
      @for (item of items(); track $index) {
        @if ($index > 0) {
          <span class="breadcrumb__sep" aria-hidden="true"> / </span>
        }
        @if (item.link) {
          <app-link-atom
            cssClass="breadcrumb__link"
            [routerLink]="item.link"
            [text]="item.label"
          />
        } @else {
          <span class="breadcrumb__current">{{ item.label }}</span>
        }
      }
    </nav>
  `,
  styles: [
    `
      .breadcrumb {
        font-size: 11px;
        color: rgba(0, 0, 0, 0.72);
      }
      .breadcrumb__current {
        color: inherit;
      }
      .breadcrumb__sep {
        user-select: none;
      }
    `,
  ],
})
export class BreadcrumbAtom {
  readonly items = input.required<BreadcrumbAtomItem[]>();
  readonly ariaLabel = input<string>('Gezinti yolu');
}
