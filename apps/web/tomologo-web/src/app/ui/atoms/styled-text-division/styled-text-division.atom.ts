import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-styled-text-division-atom',
  standalone: true,
  template: `{{ text }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class StyledTextDivisionAtom {
  @Input({ required: true }) text!: string;

  @Input()
  @HostBinding('class')
  cssClass = '';
}
