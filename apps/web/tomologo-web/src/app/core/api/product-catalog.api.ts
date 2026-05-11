import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CATALOG_API_BASE_URL } from './catalog-api-base';

export interface CatalogProductColor {
  name: string;
  hex: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  brand: string | null;
  /** Gösterim para biriminde tutar (başlığa göre TRY veya EUR). */
  priceAmount: number;
  /** `priceAmount` için ISO 4217 kodu. */
  currency: string;
  /** Depo / liste fiyatı (şu an TRY). */
  basePriceAmount: number;
  baseCurrency: string;
  /** product_prices EUR satırı; yoksa null. Kur ile hesaplanmaz. */
  euroPriceAmount: number | null;
  /** Eldeki stok (product_stocks). */
  quantityOnHand: number;
  /** Rezerve stok. */
  quantityReserved: number;
  categorySlug: string;
  image: string;
  description: string;
  colors: CatalogProductColor[];
}

@Injectable({ providedIn: 'root' })
export class ProductCatalogApiService {
  private readonly http = inject(HttpClient);

  listAll() {
    return this.http.get<CatalogProduct[]>(`${CATALOG_API_BASE_URL}/api/products`);
  }

  listByCategory(categorySlug: string) {
    return this.http.get<CatalogProduct[]>(
      `${CATALOG_API_BASE_URL}/api/categories/${encodeURIComponent(categorySlug)}/products`,
    );
  }

  getBySlug(slug: string) {
    return this.http.get<CatalogProduct>(
      `${CATALOG_API_BASE_URL}/api/products/${encodeURIComponent(slug)}`,
    );
  }
}
