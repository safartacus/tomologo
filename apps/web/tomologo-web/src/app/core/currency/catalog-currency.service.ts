import { Injectable, computed, signal } from '@angular/core';

export type CatalogCurrencyCode = 'TRY' | 'EUR';
export type SiteLanguageCode = 'en' | 'tr';

const STORAGE_KEY_LANGUAGE = 'tomologo.siteLanguage';
/** Eski sürümde yalnızca para birimi tutuluyordu; bir kez dile çevrilir. */
const LEGACY_CURRENCY_KEY = 'tomologo.catalogCurrency';

@Injectable({ providedIn: 'root' })
export class CatalogCurrencyService {
  /** Üst çubuk EN | TR; EN → EUR, TR → TRY fiyat gösterimi. */
  readonly siteLanguage = signal<SiteLanguageCode>('tr');

  /** API isteklerinde `X-Catalog-Currency` başlığına yansır. */
  readonly displayCurrency = computed<CatalogCurrencyCode>(() =>
    this.siteLanguage() === 'en' ? 'EUR' : 'TRY',
  );

  constructor() {
    try {
      const lang = sessionStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (lang === 'en' || lang === 'tr') {
        this.siteLanguage.set(lang);
        sessionStorage.removeItem(LEGACY_CURRENCY_KEY);
        return;
      }
      const legacy = sessionStorage.getItem(LEGACY_CURRENCY_KEY);
      if (legacy === 'EUR') {
        this.siteLanguage.set('en');
      }
      sessionStorage.removeItem(LEGACY_CURRENCY_KEY);
    } catch {
      /* private mode vb. */
    }
  }

  setSiteLanguage(code: SiteLanguageCode): void {
    this.siteLanguage.set(code);
    try {
      sessionStorage.setItem(STORAGE_KEY_LANGUAGE, code);
    } catch {
      /* ignore */
    }
  }
}
