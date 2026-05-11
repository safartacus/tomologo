import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-pagination-desc',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="paginationDesc" role="status">
      @if (total() === 0) {
        Sonuç bulunamadı.
      } @else {
        {{ total() }} sonuçtan {{ start() }}-{{ end() }} arası gösteriliyor
      }
    </p>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .paginationDesc {
        margin: 0;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.72);
      }
    `,
  ],
})
export class PaginationDescAtom {
  /** Toplam kayıt sayısı */
  readonly total = input.required<number>();
  /** Gösterilen aralığın başı (1 tabanlı). Boşsa ve total > 0 ise 1 kabul edilir. */
  readonly rangeStart = input<number | undefined>(undefined);
  /** Gösterilen aralığın sonu. Boşsa total ile aynı kabul edilir (tek sayfa). */
  readonly rangeEnd = input<number | undefined>(undefined);

  protected readonly start = computed(() => {
    const t = this.total();
    if (t === 0) return 0;
    return this.rangeStart() ?? 1;
  });

  protected readonly end = computed(() => {
    const t = this.total();
    if (t === 0) return 0;
    return this.rangeEnd() ?? t;
  });
}
