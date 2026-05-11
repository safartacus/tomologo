import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';
import { HeaderLogoMolecule } from '../../molecules/header-logo/header-logo.molecule';
import { HeaderSorumluUretimMolecule } from '../../molecules/header-sorumlu-uretim/header-sorumlu-uretim.molecule';
import { HeaderUserSpotMolecule } from '../../molecules/header-user-spot/header-user-spot.molecule';
import { HeaderUrunKategoriMolecule } from '../../molecules/header-urun-kategori/header-urun-kategori.molecule';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    HeaderLogoMolecule,
    LinkAtom,
    HeaderSorumluUretimMolecule,
    HeaderUserSpotMolecule,
    HeaderUrunKategoriMolecule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <div class="header__container">
        <nav class="header__nav" aria-label="Ana menü">
          <app-header-urun-kategori />
          <app-link-atom cssClass="hnl" href="#" text="HİKAYEMİZ" />
          <app-header-sorumlu-uretim />
          <app-link-atom cssClass="hnl" href="#" text="BLOG" />
        </nav>

        <app-header-logo />

        <div class="header__actions">
          <button
            type="button"
            class="header__burger"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="header-mobile-menu"
            aria-label="Menüyü aç"
          >
            <span class="header__burgerLine" aria-hidden="true"></span>
            <span class="header__burgerLine" aria-hidden="true"></span>
            <span class="header__burgerLine" aria-hidden="true"></span>
          </button>
          <app-header-user-spot />
        </div>
      </div>
    </header>

    @if (menuOpen()) {
      <div
        class="header__backdrop"
        (click)="closeMenu()"
        aria-hidden="true"
      ></div>
      <div
        id="header-mobile-menu"
        class="header__drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menüsü"
      >
        <div class="header__drawerHead">
          <span class="header__drawerTitle">Menü</span>
          <button
            type="button"
            class="header__drawerClose"
            (click)="closeMenu()"
            aria-label="Menüyü kapat"
          >
            ×
          </button>
        </div>
        <nav class="header__drawerNav" aria-label="Mobil menü">
          <a class="header__drawerLink" routerLink="/tum-urunler" (click)="closeMenu()"
            >TÜM ÜRÜNLER</a
          >
          <a class="header__drawerLink" routerLink="/urun-kategori/canta" (click)="closeMenu()"
            >ÇANTA</a
          >
          <a class="header__drawerLink" routerLink="/tum-urunler/mini-clutch" (click)="closeMenu()"
            >MİNİ CLUTCH</a
          >
          <a class="header__drawerLink" routerLink="/urun-kategori/aksesuar" (click)="closeMenu()"
            >AKSESUAR</a
          >
          <a class="header__drawerLink" href="#" (click)="closeMenu()">HİKAYEMİZ</a>
          <a class="header__drawerLink" href="#" (click)="closeMenu()">SORUMLU ÜRETİM</a>
          <a class="header__drawerLink" href="#" (click)="closeMenu()">BLOG</a>
          <div class="header__drawerRule" aria-hidden="true"></div>
          <a class="header__drawerLink header__drawerLink--secondary" href="#" (click)="closeMenu()"
            >KAYIT OL</a
          >
          <a class="header__drawerLink header__drawerLink--secondary" href="#" (click)="closeMenu()"
            >GİRİŞ YAP</a
          >
        </nav>
      </div>
    }
  `,
  styles: [
    `
      .header {
        background: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        height: 80px;
      }
      .header__container {
        max-width: 1180px;
        margin: 0 auto;
        height: 80px;
        padding: 0 16px;
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 16px;
      }
      .header__nav {
        display: flex;
        gap: 18px;
        align-items: center;
        justify-content: flex-start;
      }
      .header__actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
      }
      .header__burger {
        display: none;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        width: 40px;
        height: 40px;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        color: #111;
      }
      .header__burgerLine {
        display: block;
        height: 2px;
        width: 20px;
        background: currentColor;
        border-radius: 1px;
      }

      .header__drawerLink {
        display: block;
        padding: 12px 16px;
        font-size: 11px;
        letter-spacing: 0.1em;
        text-decoration: none;
        text-transform: uppercase;
        color: #111;
      }
      .header__drawerLink:hover {
        background: rgba(0, 0, 0, 0.04);
      }
      .header__drawerLink--secondary {
        color: rgba(0, 0, 0, 0.62);
        letter-spacing: 0.08em;
      }
      .header__drawerRule {
        height: 1px;
        margin: 12px 16px 4px;
        background: rgba(0, 0, 0, 0.1);
        flex-shrink: 0;
      }

      @media (max-width: 768px) {
        .header {
          height: 56px;
        }
        .header__container {
          height: 56px;
          grid-template-columns: 1fr auto;
          grid-template-areas: 'logo actions';
        }
        .header__nav {
          display: none;
        }
        .header__burger {
          display: inline-flex;
        }
        .header__actions {
          grid-area: actions;
          gap: 4px;
        }
      }

      @media (max-width: 920px) and (min-width: 769px) {
        .header__container {
          grid-template-columns: 1fr auto;
          grid-template-areas:
            'logo actions'
            'nav nav';
        }
        .header__actions {
          grid-area: actions;
        }
        .header__nav {
          grid-area: nav;
          flex-wrap: wrap;
          gap: 12px;
        }
      }

      .header__backdrop {
        position: fixed;
        inset: 0;
        z-index: 400;
        background: rgba(0, 0, 0, 0.45);
      }
      .header__drawer {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 401;
        width: min(320px, 88vw);
        background: #fff;
        box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
        display: flex;
        flex-direction: column;
        animation: headerDrawerIn 0.2s ease-out;
      }
      @keyframes headerDrawerIn {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
      .header__drawerHead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
      .header__drawerTitle {
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.55);
      }
      .header__drawerClose {
        width: 36px;
        height: 36px;
        border: 0;
        background: transparent;
        font-size: 26px;
        line-height: 1;
        cursor: pointer;
        color: #111;
      }
      .header__drawerNav {
        display: flex;
        flex-direction: column;
        padding: 8px 0 24px;
        overflow-y: auto;
      }
    `,
  ],
})
export class HeaderOrganism {
  protected readonly menuOpen = signal(false);

  constructor() {
    const router = inject(Router);
    const host = inject(ElementRef<HTMLElement>);
    const destroyRef = inject(DestroyRef);

    /**
     * Üst menüde routerLink ile sayfa değişince odak tetikte kalıyor;
     * :focus-within mega paneli açık bırakıp içeriği (ör. tüm ürünler grid) tıklanamaz yapıyordu.
     */
    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(destroyRef),
      )
      .subscribe(() => {
        const ae = document.activeElement;
        if (ae instanceof HTMLElement && host.nativeElement.contains(ae)) {
          ae.blur();
        }
      });

    effect(() => {
      const open = this.menuOpen();
      if (typeof document !== 'undefined') {
        document.body.style.overflow = open ? 'hidden' : '';
      }
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
