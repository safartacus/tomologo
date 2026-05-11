# Frontend mimarisi (Angular) — Agent referansı

Bu doküman, **tomologo** e-ticaret mağazası Angular istemcisi için klasör yapısı, katmanlar ve kararları tanımlar. Kod üretirken veya refaktör ederken bu kurallara uy.

---

## 1. Teknoloji ve sürüm varsayımı

- **Angular** (tercihen güncel LTS): standalone bileşenler, `inject()` ile DI, mümkünse **Signals** (`signal`, `computed`, `effect`) veya en azından tutarlı bir state stratejisi.
- **TypeScript** katı mod; `any` kullanma; `unknown` + daraltma tercih et.
- Stil: **SCSS** veya proje seçimi; tasarım token’ları (CSS değişkenleri) merkezi dosyada.

---

## 2. Atomik tasarım (zorunlu zihin modeli)

| Katman | Klasör | Sorumluluk |
|--------|--------|------------|
| **Atoms** | `ui/atoms/` | Tek işlevli, veri bağlama minimum: ikon, rozet, düz metin, tek görsel, fiyat satırı. |
| **Molecules** | `ui/molecules/` | 2–4 atom birleşimi: görsel + başlık, fiyat + para birimi + indirim rozeti. |
| **Organisms** | `ui/organisms/` | anlamlı UI bloğu: ürün kartı, header, duyuru bandı, ürün detay üst bloğu. |
| **Features** | `features/<alan>/` | Sayfa akışı, route’a yakın bileşenler, API çağrısı veya store burada başlar. |
| **Layouts** | `layouts/` | Kabuk: `main-layout`, `checkout-layout`. |
| **Pages** | `pages/` veya `features/.../pages/` | Route bileşeni; ince tutulur: sadece layout + feature organism’leri birleştirir. |

**Kural:** Atom/molecule içinde **HTTP çağrısı yapma**; veri üstten (`Input`, resolver, store) gelir. İstisna: tamamen sunumsal ve cache’lenmiş küçük veri — yine de tercih üst katman.

---

## 3. Klasör yapısı (önerilen)

```text
src/app/
  core/                 # singleton: HTTP interceptors, auth guard, app config
  shared/               # pipe, directive, util (atomik olmayan yardımcılar)
  layouts/
  ui/
    atoms/
    molecules/
    organisms/
  features/
    catalog/
    cart/
    checkout/
    account/
  pages/                # veya features/*/pages
```

- **`core`:** uygulama ömrü boyunca tek; feature’lara tekrar export etmekten kaçın (sadece `import from core` uygulama kökünde).
- **`shared`:** gerçekten ortak olanlar; şişirmeden kullan.

---

## 4. İsimlendirme ve selector

- Selector prefix: **`app`** veya proje adı (`tomo`) — projede tek prefix.
- Dosya adı: **`product-image.component.ts`** (kebab-case) veya takım tercihi **Pascal** dosya adı; repo içinde **tutarlı** ol.
- Sınıf adı: **`ProductImageComponent`** (PascalCase).

---

## 5. Veri akışı

- **Sunucu verisi:** `features` içinde servis (`catalog-api.service.ts`) + tipler (`catalog.types.ts`).
- **Sunum:** `ui/*` sadece `@Input` / `input()` ile beslenir; mümkünse **presentational** (dumb) bileşen.
- **Global UI state:** `core` veya `features` altında küçük signal store; gereksiz NgRx’ten kaçın MVP’de.

---

## 6. Routing

- Lazy load: **`features/catalog/catalog.routes.ts`** gibi feature başına route dosyası.
- Guard ve resolver: auth ve kritik veri için `core` veya feature içinde.

---

## 7. SEO ve render

- Ürün ve kategori sayfaları için **SSR / prerender** hedefi mimaride vardır; agent kod üretirken `PLATFORM_ID` ile browser-only API’leri koru.

---

## 8. Medya ve performans

- Görseller: `loading="lazy"`, uygun `width`/`height` veya sabit en-boy oranı; mümkünse **WebP/AVIF** kaynağı.
- Liste sayfalarında ağır logic yok; `OnPush` (standart dokümanda).

---

## 9. İlgili dokümanlar

- Bileşen ve kod stiline dair ayrıntılar: **`component-standards.md`** (aynı klasör).
- Genel ürün mimarisi: `docs/ETICARET-MIMARI-YOL-HARITASI.md`.

---

## 10. Agent checklist (PR öncesi)

- [ ] Yeni UI parçası doğru atomik seviyede mi?
- [ ] Atom/molecule’de doğrudan HTTP var mı? (olmamalı)
- [ ] `class` / `ngClass` birleştirme kurallarına uyuldu mu?
- [ ] Erişilebilirlik: buton/link, `alt`, odak sırası düşünüldü mü?
