import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="homeHero" aria-label="Kampanya">
      <div class="homeHero__banner">
        ANNELER GÜNÜNE ÖZEL "ANNELERGÜNÜ30" KODUYLA SEPETTE %30 İNDİRİM!
      </div>
    </section>
  `,
  styles: [
    `
      .homeHero {
        height: 520px;
        width: 100vw;
        margin-left: calc(50% - 50vw);
        margin-right: calc(50% - 50vw);
        background:
          url('https://tomologo-official.com/wp-content/uploads/2024/12/tomologo-canta-banner-scaled.jpg')
            center center / cover no-repeat,
          #ddd;
        position: relative;
        overflow: hidden;
      }
      .homeHero__banner {
        position: absolute;
        left: 50%;
        top: 98px;
        transform: translateX(-50%);
        background: rgb(255, 75, 74);
        color: #fff;
        padding: 0 12px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 31px;
        font-weight: 400;
        letter-spacing: 0;
        line-height: 40px;
        text-transform: uppercase;
        white-space: nowrap;
      }

      @media (max-width: 980px) {
        .homeHero__banner {
          top: 92px;
          font-size: 18px;
          line-height: 24px;
          height: auto;
          padding: 6px 10px;
          white-space: normal;
          text-align: center;
          width: calc(100% - 32px);
        }
      }
    `,
  ],
})
export class HomeHeroAtom {}
