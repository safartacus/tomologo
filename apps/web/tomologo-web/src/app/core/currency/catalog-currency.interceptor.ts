import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CATALOG_API_BASE_URL } from '../api/catalog-api-base';
import { CatalogCurrencyService } from './catalog-currency.service';

/** Katalog API çağrılarına gösterim para birimi başlığı ekler. */
export const catalogCurrencyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(CATALOG_API_BASE_URL)) {
    return next(req);
  }
  const code = inject(CatalogCurrencyService).displayCurrency();
  return next(
    req.clone({
      setHeaders: { 'X-Catalog-Currency': code },
    }),
  );
};
