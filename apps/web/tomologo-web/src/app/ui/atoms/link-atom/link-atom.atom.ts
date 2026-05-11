import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-link-atom',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [class]="cssClass"
      [routerLink]="routerLinkBinding"
      [queryParams]="queryParamsBinding"
      [fragment]="fragmentBinding"
      [attr.href]="hrefBinding"
      [attr.target]="target || null"
      [attr.rel]="rel || null"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-haspopup]="ariaHaspopup || null"
      [attr.aria-expanded]="ariaExpandedAttr"
      [attr.role]="htmlRole || null"
    >
      @if (hasPlainText()) {
        {{ text }}
      } @else {
        <ng-content />
      }
    </a>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class LinkAtom {
  @Input() cssClass = '';
  @Input() text?: string;
  @Input() href = '#';
  @Input() routerLink?: string | readonly (string | number)[];
  @Input() queryParams?: Params | null;
  @Input() fragment?: string;
  @Input() target?: string;
  @Input() rel?: string;
  @Input() ariaLabel?: string;
  @Input() ariaHaspopup?: string;
  @Input() ariaExpanded?: string | boolean;
  @Input() htmlRole?: string;

  protected get routerLinkBinding(): string | readonly (string | number)[] | undefined {
    return this.useRouter() ? (this.routerLink as string | readonly (string | number)[]) : undefined;
  }

  protected get queryParamsBinding(): Params | undefined {
    return this.useRouter() ? (this.queryParams ?? undefined) : undefined;
  }

  protected get fragmentBinding(): string | undefined {
    return this.useRouter() ? (this.fragment ?? undefined) : undefined;
  }

  /** Router kullanılırken native href’i kaldırır; yalnız href modunda kullanılır. */
  protected get hrefBinding(): string | null | undefined {
    return this.useRouter() ? null : this.href;
  }

  protected get ariaExpandedAttr(): string | null {
    const v = this.ariaExpanded;
    if (v === undefined || v === null) {
      return null;
    }
    return typeof v === 'boolean' ? (v ? 'true' : 'false') : v;
  }

  protected useRouter(): boolean {
    const rl = this.routerLink;
    if (rl === undefined || rl === null) {
      return false;
    }
    if (typeof rl === 'string') {
      return rl.length > 0;
    }
    return Array.isArray(rl) && rl.length > 0;
  }

  protected hasPlainText(): boolean {
    return this.text !== undefined && this.text !== null && this.text !== '';
  }
}
