/** Katalog ürün fiyatları (API’den gelen ISO kod ile). */
export function formatCatalogMoney(
  amount: number,
  currencyCode: string,
  locale = 'tr-TR',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
