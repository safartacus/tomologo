import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LinkAtom } from '../../atoms/link-atom/link-atom.atom';
import { StyledTextDivisionAtom } from '../../atoms/styled-text-division/styled-text-division.atom';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [LinkAtom, StyledTextDivisionAtom],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__cols">
          <div class="footer__col">
            <div class="footer__title">YARDIM</div>
            <app-link-atom cssClass="footer__link" href="#" text="SSS" />
            <app-link-atom cssClass="footer__link" href="#" text="Değişim & İade" />
            <app-link-atom cssClass="footer__link" href="#" text="Kargo & Teslimat" />
            <app-link-atom cssClass="footer__link" href="#" text="İletişim" />
          </div>

          <div class="footer__col">
            <div class="footer__title">KURUMSAL</div>
            <app-link-atom cssClass="footer__link" href="#" text="Hikayemiz" />
            <app-link-atom cssClass="footer__link" href="#" text="Sorumluluğumuz" />
            <app-link-atom cssClass="footer__link" href="#" text="Sınırlarımız" />
            <app-link-atom cssClass="footer__link" href="#" text="Satış Noktalarımız" />
          </div>

          <div class="footer__col">
            <div class="footer__title">BAKIM</div>
            <app-link-atom cssClass="footer__link" href="#" text="Derilerimiz" />
            <app-link-atom cssClass="footer__link" href="#" text="Deri Çanta Bakım" />
            <app-link-atom cssClass="footer__link" href="#" text="Revive Deri Bakım" />
          </div>

          <div class="footer__col">
            <div class="footer__title">YASAL</div>
            <app-link-atom cssClass="footer__link" href="#" text="Aydınlatma Metni" />
            <app-link-atom cssClass="footer__link" href="#" text="Gizlilik Politikası" />
            <app-link-atom cssClass="footer__link" href="#" text="Çerez Politikası" />
            <app-link-atom cssClass="footer__link" href="#" text="Mesafeli Satış Sözleşmesi" />
          </div>
        </div>

        <div class="footer__bottom">
          <app-styled-text-division-atom
            cssClass="footer__copy"
            text="© 2026 Tomologo. All rights reserved"
          />
          <div class="footer__payments" aria-label="Ödeme yöntemleri">
            <span class="footer__payment">iyzico</span>
            <span class="footer__payment">VISA</span>
            <span class="footer__payment">Mastercard</span>
            <span class="footer__payment">troy</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        background: #fff;
        padding: 24px 0 16px;
      }
      .footer__container {
        max-width: 1180px;
        margin: 0 auto;
        padding: 0 16px;
      }
      .footer__cols {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 24px;
      }
      .footer__title {
        font-size: 11px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        margin-bottom: 10px;
        color: #111;
      }
      .footer__bottom {
        margin-top: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        font-size: 11px;
        color: rgba(0, 0, 0, 0.6);
      }
      .footer__payments {
        display: flex;
        gap: 10px;
        align-items: center;
      }
      .footer__payment {
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.6);
      }
      @media (max-width: 900px) {
        .footer__cols {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (max-width: 520px) {
        .footer__cols {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class FooterOrganism {}

