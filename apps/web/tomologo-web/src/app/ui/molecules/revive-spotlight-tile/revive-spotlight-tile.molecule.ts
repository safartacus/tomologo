import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StyledTextDivisionAtom } from '../../atoms/styled-text-division/styled-text-division.atom';

@Component({
  selector: 'app-revive-spotlight-tile',
  standalone: true,
  imports: [StyledTextDivisionAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="reviveSpotlightTile">
      <div class="reviveSpotlightTile__imgWrap">
        <img
          class="reviveSpotlightTile__img"
          [src]="image"
          [alt]="name"
          loading="lazy"
          decoding="async"
        />
      </div>
      <app-styled-text-division-atom cssClass="reviveSpotlightTile__caption" [text]="name" />
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        min-width: 0;
      }
      .reviveSpotlightTile {
        margin: 0;
        text-align: center;
      }
      .reviveSpotlightTile__imgWrap {
        width: 100%;
        aspect-ratio: 3 / 4;
        background: #f4f4f4;
        overflow: hidden;
      }
      .reviveSpotlightTile__img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
      }
    `,
  ],
})
export class ReviveSpotlightTileMolecule {
  @Input({ required: true }) name = '';
  @Input({ required: true }) image = '';
}
