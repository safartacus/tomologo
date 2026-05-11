# SEO yol haritası (Angular mağaza + .NET)

Küçük katalog (~20 SKU) için **teknik SEO** ve **içerik SEO** dengesi yeterlidir. Aşağıdaki sıra, önce ölçülebilir temeli kurup sonra ince ayar yapmayı hedefler.

---

## 1. Mimari karar (en kritik adım)

Angular **CSR-only** (saf SPA) Google için zorlayıcı olabilir; özellikle ürün ve kategori sayfalarında.

| Seçenek | Ne zaman |
|---------|----------|
| **SSR (Angular Universal)** | Ürün/kategori URL’leri SEO ana omurga; önerilen üretim yolu. |
| **Prerender (ör. `ng prerender`, Scully, custom build)** | İçerik nadiren değişiyorsa ve sunucu SSR işletmek istemiyorsanız. |
| **Hybrid** | Sadece `/urun/*`, `/kategori/*` SSR/prerender; sepet/hesap CSR. |

**İlerleme:** Önce hangi route’ların “indekslenebilir” olacağını listeleyin; bunlar için HTML’de anlamlı `<title>`, `meta description`, `h1` ve gövde metni üretin.

---

## 2. Sayfa başına zorunlu öğeler

Her **indekslenebilir** sayfa için:

- **`title`** — benzersiz; marka adı sonda veya başta tutarlı bir şablon.
- **`meta name="description"`** — 120–160 karakter civarı; kopya sayfa yok.
- **`link rel="canonical"`** — filtre/query varyantlarında tek “asıl” URL.
- **Tek `h1`** — sayfa konusu net.
- **Anlamlı URL’ler** — `/urun/el-cantasi-siyah` gibi; ID-only (`/p/42`) mümkünse slug ile destekleyin.

---

## 3. Yapılandırılmış veri (Schema.org)

- Ürün detay: **`Product`** (+ `Offer`, `priceCurrency`, `availability`, `sku`).
- Breadcrumb: **`BreadcrumbList`**.
- Organizasyon: **`Organization`** (ana sayfa veya `sameAs` sosyal linkler).

JSON-LD script olarak gömülmesi yaygın ve bakımı kolaydır. SSR/prerender ile sunucu tarafında üretmek, botların gördüğü HTML ile uyumu garanti eder.

---

## 4. WordPress’ten geçiş

- **301 yönlendirme** tablosu: eski `permalink` → yeni URL (slug değişmezse bile kontrol edin).
- **Sitemap** yeni domain/path ile güncellenince Search Console’a gönderin.
- Kırık link taraması (Screaming Frog, Ahrefs, veya basit crawler) bir kez çalıştırın.

---

## 5. Sitemap ve robots

- **`/sitemap.xml`** (veya indeks + alt sitemap’ler): ürün, kategori, statik sayfalar.
- **`robots.txt`**: staging’i `Disallow`; prod’da gereksiz path’leri (sepet, ödeme sonucu, hesap) kapatın veya `noindex` kullanın.
- **Ödeme / checkout** sayfaları: genelde **noindex, follow** (organik trafik hedefi değil).

---

## 6. Performans = SEO (Core Web Vitals)

- LCP: hero görsel boyutu, `fetchpriority`, uygun boyutlar (responsive `srcset`).
- CLS: görsel ve font için rezerv alan.
- INP: ağır JS’i erteleme, liste sayfalarında gereksiz hydration.

Lighthouse ve Search Console **Core Web Vitals** raporunu takip edin.

---

## 7. iyzico ile birlikte (checkout yaklaşımı)

- Ödeme sayfası sizdeyse: ödeme akışını **tek kanonik URL** altında tutun; ödeme adımlarını indekslemeyin.
- Ödeme sonucu sayfaları (`/payment/success`, `/payment/fail`): genelde **noindex**; kullanıcı deneyimi odaklı.
- Webhook/callback’ler zaten backend endpoint’tir; SEO konusu değildir (ama güvenlik ve idempotency kritiktir).

---

## 8. İçerik ve yerel SEO (Türkiye)

- Ürün açıklamaları: kopya metin yerine **özgün** metin; anahtar kelime doldurma değil, fayda odaklı.
- **Google İşletme Profili** (fiziksel atölye / mağaza varsa) ile site uyumu.
- Yasal sayfalar: mesafeli satış, iade, KVKK — güven sinyali (dolaylı SEO).

---

## 9. Ölçüm ve araçlar

- **Google Search Console:** özellikle geçiş sonrası 3–6 ay izleme.
- (İsteğe bağlı) Bing Webmaster.
- Analitik: GA4 veya gizlilik dostu alternatif; SEO ile doğrudan sıralama değil ama davranış analizi için.

---

## 10. Faz planı (özet)

| Faz | İş |
|-----|-----|
| **F1** | İndekslenecek route listesi + SSR/prerender kararı |
| **F2** | Title/description/canonical + `h1` şablonları (Angular meta service veya SSR head) |
| **F3** | JSON-LD Product + Breadcrumb |
| **F4** | Sitemap + robots + 301 haritası (WP’den) |
| **F5** | Search Console doğrulama, gönderim, vitals iyileştirme |

---

## 11. İlgili dokümanlar

- `docs/frontend/mimari.md` — SSR/CSR notu.
- `docs/ETICARET-MIMARI-YOL-HARITASI.md` — F4 içerik & SEO fazı.

---

Bu doküman hukuki veya pazarlama garantisi vermez; sıralama algoritmaları değişkendir. Teknik olarak “bot ve kullanıcı aynı anlamlı HTML’i görüyor mu?” sorusuna odaklanın.

# SEO yol haritası (Angular mağaza + .NET)

Küçük katalog (~20 SKU) için **teknik SEO** ve **içerik SEO** dengesi yeterlidir. Aşağıdaki sıra, önce ölçülebilir temeli kurup sonra ince ayar yapmayı hedefler.

---

## 1. Mimari karar (en kritik adım)

Angular **CSR-only** (saf SPA) Google için zorlayıcı olabilir; özellikle ürün ve kategori sayfalarında.

| Seçenek | Ne zaman |
|---------|----------|
| **SSR (Angular Universal)** | Ürün/kategori URL’leri SEO ana omurga; önerilen üretim yolu. |
| **Prerender (ör. `ng prerender`, Scully, custom build)** | İçerik nadiren değişiyorsa ve sunucu SSR işletmek istemiyorsanız. |
| **Hybrid** | Sadece `/urun/*`, `/kategori/*` SSR/prerender; sepet/hesap CSR. |

**İlerleme:** Önce hangi route’ların “indekslenebilir” olacağını listeleyin; bunlar için HTML’de anlamlı `<title>`, `meta description`, `h1` ve gövde metni üretin.

---

## 2. Sayfa başına zorunlu öğeler

Her **indekslenebilir** sayfa için:

- **`title`** — benzersiz; marka adı sonda veya başta tutarlı bir şablon.
- **`meta name="description"`** — 120–160 karakter civarı; kopya sayfa yok.
- **`link rel="canonical"`** — filtre/query varyantlarında tek “asıl” URL.
- **Tek `h1`** — sayfa konusu net.
- **Anlamlı URL’ler** — `/urun/el-cantasi-siyah` gibi; ID-only (`/p/42`) mümkünse slug ile destekleyin.

---

## 3. Yapılandırılmış veri (Schema.org)

- Ürün detay: **`Product`** (+ `Offer`, `priceCurrency`, `availability`, `sku`).
- Breadcrumb: **`BreadcrumbList`**.
- Organizasyon: **`Organization`** (ana sayfa veya `sameAs` sosyal linkler).

JSON-LD script olarak gömülmesi yaygın ve bakımı kolaydır. SSR/prerender ile sunucu tarafında üretmek, botların gördüğü HTML ile uyumu garanti eder.

---

## 4. WordPress’ten geçiş

- **301 yönlendirme** tablosu: eski `permalink` → yeni URL (slug değişmezse bile kontrol edin).
- **Sitemap** yeni domain/path ile güncellenince Search Console’a gönderin.
- Kırık link taraması (Screaming Frog, Ahrefs, veya basit crawler) bir kez çalıştırın.

---

## 5. Sitemap ve robots

- **`/sitemap.xml`** (veya indeks + alt sitemap’ler): ürün, kategori, statik sayfalar.
- **`robots.txt`**: staging’i `Disallow`; prod’da gereksiz path’leri (sepet, ödeme sonucu, hesap) kapatın veya `noindex` kullanın.
- **Ödeme / checkout** sayfaları: genelde **noindex, follow** (organik trafik hedefi değil).

---

## 6. Performans = SEO (Core Web Vitals)

- LCP: hero görsel boyutu, `fetchpriority`, uygun boyutlar (responsive `srcset`).
- CLS: görsel ve font için rezerv alan.
- INP: ağır JS’i erteleme, liste sayfalarında gereksiz hydration.

Lighthouse ve Search Console **Core Web Vitals** raporunu takip edin.

---

## 7. iyzico ile birlikte (checkout yaklaşımı)

- Ödeme sayfası sizdeyse: ödeme akışını **tek kanonik URL** altında tutun; ödeme adımlarını indekslemeyin.
- Ödeme sonucu sayfaları (`/payment/success`, `/payment/fail`): genelde **noindex**; kullanıcı deneyimi odaklı.
- Webhook/callback’ler zaten backend endpoint’tir; SEO konusu değildir (ama güvenlik ve idempotency kritiktir).

---

## 8. İçerik ve yerel SEO (Türkiye)

- Ürün açıklamaları: kopya metin yerine **özgün** metin; anahtar kelime doldurma değil, fayda odaklı.
- **Google İşletme Profili** (fiziksel atölye / mağaza varsa) ile site uyumu.
- Yasal sayfalar: mesafeli satış, iade, KVKK — güven sinyali (dolaylı SEO).

---

## 9. Ölçüm ve araçlar

- **Google Search Console:** özellikle geçiş sonrası 3–6 ay izleme.
- (İsteğe bağlı) Bing Webmaster.
- Analitik: GA4 veya gizlilik dostu alternatif; SEO ile doğrudan sıralama değil ama davranış analizi için.

---

## 10. Faz planı (özet)

| Faz | İş |
|-----|-----|
| **F1** | İndekslenecek route listesi + SSR/prerender kararı |
| **F2** | Title/description/canonical + `h1` şablonları (Angular meta service veya SSR head) |
| **F3** | JSON-LD Product + Breadcrumb |
| **F4** | Sitemap + robots + 301 haritası (WP’den) |
| **F5** | Search Console doğrulama, gönderim, vitals iyileştirme |

---

## 11. İlgili dokümanlar

- `docs/frontend/mimari.md` — SSR/CSR notu.
- `docs/ETICARET-MIMARI-YOL-HARITASI.md` — F4 içerik & SEO fazı.

---

Bu doküman hukuki veya pazarlama garantisi vermez; sıralama algoritmaları değişkendir. Teknik olarak “bot ve kullanıcı aynı anlamlı HTML’i görüyor mu?” sorusuna odaklanın.
