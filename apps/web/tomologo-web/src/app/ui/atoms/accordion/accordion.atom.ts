import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <details #root class="accordion">
      <summary class="accordion__summary">
        <span class="accordion__title">{{ title() }}</span>
        <span class="accordion__icon" aria-hidden="true"></span>
      </summary>
      @for (line of lines(); track $index) {
        <p class="accordion__text">{{ line }}</p>
      }
    </details>
  `,
  styles: [
    `
      .accordion {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px 0;
      }
      .accordion__summary {
        cursor: pointer;
        font-size: 11px;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        user-select: none;
      }
      .accordion__summary::-webkit-details-marker {
        display: none;
      }
      .accordion__title {
        font-weight: 600;
        letter-spacing: 0.06em;
        color: #8f825c;
      }
      .accordion__icon {
        flex-shrink: 0;
        width: 14px;
        height: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .accordion__icon::before {
        content: '▼';
        font-size: 9px;
        line-height: 1;
        color: rgba(0, 0, 0, 0.35);
        display: block;
        transition: transform 0.2s ease;
      }
      .accordion[open] > .accordion__summary .accordion__icon::before {
        transform: rotate(180deg);
      }
      .accordion__text {
        margin: 8px 0 0;
        font-size: 11px;
        color: var(--muted);
      }
      .accordion__text:last-child {
        margin-bottom: 0;
      }
    `,
  ],
})
export class AccordionAtom {
  private readonly root = viewChild.required<ElementRef<HTMLDetailsElement>>('root');

  readonly title = input.required<string>();
  readonly lines = input.required<string[]>();
  readonly initiallyOpen = input(false);

  constructor() {
    afterNextRender(() => {
      const el = this.root().nativeElement;
      el.open = this.initiallyOpen();
    });
  }
}
