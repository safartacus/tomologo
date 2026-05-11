import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-revive-story-announcement',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isActive() && text()) {
      <aside class="announce" aria-label="Marka mesajı">
        <hr class="announce__line" />
        <p class="announce__text">{{ text() }}</p>
      </aside>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .announce {
        max-width: min(880px, calc(100% - 32px));
        margin: 0 auto;
        padding: 0 var(--page-pad) 52px;
        text-align: center;
      }
      .announce__line {
        border: 0;
        height: 1px;
        margin: 0 0 22px;
        background: rgba(0, 0, 0, 0.12);
      }
      .announce__text {
        margin: 0;
        font-style: italic;
        font-size: 13px;
        line-height: 1.75;
        color: rgba(0, 0, 0, 0.78);
        letter-spacing: 0.02em;
      }
    `,
  ],
})
export class ReviveStoryAnnouncementAtom {
  readonly isActive = input<boolean>(true);

  readonly text = input<string>('');
}
