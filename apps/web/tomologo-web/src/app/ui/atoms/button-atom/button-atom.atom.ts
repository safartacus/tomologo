import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-atom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [class]="cssClass"
      [attr.aria-label]="ariaLabel || null"
      [attr.aria-expanded]="ariaExpandedAttr"
      [attr.aria-haspopup]="ariaHaspopup || null"
      [disabled]="disabled"
    >
      @if (hasPlainText()) {
        {{ text }}
      } @else {
        <ng-content />
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ButtonAtom {
  @Input() cssClass = '';
  @Input() text?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() ariaLabel?: string;
  @Input() ariaHaspopup?: string;
  @Input() ariaExpanded?: string | boolean;
  @Input() disabled = false;

  protected get ariaExpandedAttr(): string | null {
    const v = this.ariaExpanded;
    if (v === undefined || v === null) {
      return null;
    }
    return typeof v === 'boolean' ? (v ? 'true' : 'false') : v;
  }

  protected hasPlainText(): boolean {
    return this.text !== undefined && this.text !== null && this.text !== '';
  }
}
