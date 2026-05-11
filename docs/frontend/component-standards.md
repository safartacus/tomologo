# Bileşen ve kod standartları (Angular) — Agent referansı

`mimari.md` ile birlikte kullan. Amaç: tutarlı, birleştirilebilir, erişilebilir bileşenler.

---

## 1. Bileşen türleri

| Tür | `changeDetection` | Veri |
|-----|-------------------|------|
| `ui/atoms`, `ui/molecules`, `ui/organisms` | **`ChangeDetectionStrategy.OnPush`** (varsayılan) | `@Input` / `input()`; olaylar `output()` / `@Output`. |
| Feature “container” | OnPush | Servis inject; altına dumb child veri geçir. |

`Default` stratejiyi yalnız geçerli gerekçeyle kullan.

---

## 2. `input()` / `output()` (tercih)

- Yeni kodda **`input()`** ve **`output()`** kullan (`signal`-tabanlı API).
- Zorunlu input: `input.required<T>()`.
- İsimler: `product`, `imageUrl`, `isLoading`; boolean için `disabled`, `selected` gibi sıfat.

---

## 3. Dışarıdan stil: `class` birleştirme

Angular’da `class` kelimesi TypeScript ile çakışabilir; aşağıdakinden **birini** seç ve repoda sabitle:

**Seçenek A — `hostClass` / `extraClass`**

```typescript
readonly hostClass = input<string>('');
// template: [class]="['atom-image', hostClass()]"
```

**Seçenek B — `ngClass` ile dizi**

```html
[ngClass]="['atom-image', hostClass()]"
```

**Seçenek C — `@HostBinding` (atom kökü host ise)**

```typescript
readonly hostClass = input('');
@HostBinding('class') get hostClasses(): string {
  return ['atom-image', this.hostClass()].filter(Boolean).join(' ');
}
```

**Kurallar**

- Atom her zaman **taban BEM veya utility** sınıfını kendi içinde taşır; dışarıdan gelen sadece **ek** olur.
- `undefined` / boş string güvenli birleştirilsin.
- Tailwind kullanılıyorsa: `tw = input('')` gibi isim + aynı birleştirme mantığı kabul edilebilir.

---

## 4. Şablon ve stil

- Şablonlar **kısa**; `*ngIf` yerine mümkünse `@if`; `*ngFor` yerine `@for` (Angular 17+).
- Karmaşık koşulları component’e `computed` veya metot çıkar.
- Stil: bileşen SCSS’i **kapsül**; global sadece `styles.scss` ve token dosyası.
- **`::ng-deep` kullanma**; gerekirse `ViewEncapsulation` veya tasarım token ile çöz.

---

## 4.1 Görünüm sabitliği (ekran görüntüsü sözleşmesi)

Bu projede amaç “yeniden yazarken görünüm değişmesin”. Bu yüzden aşağıdaki UI kalıpları **sabit kabul edilir**; component yazarken bu düzeni bozma.

- **Header / topbar**: üstte siyah ince bant + dil seçimi; altında logo merkezli header; solda menü, sağda hesap + arama/sepet ikonları.
- **Ürün kartı**: büyük görsel, altında isim + fiyat; ferah beyaz boşluk, grid hizaları sabit.
- **İlgili ürünler (carousel)**:
  - Başlık: **“İLGİLİ ÜRÜNLER”** ortalı.
  - Aynı satırda **4 kart** görünür (desktop).
  - Altta **nokta pagination** (aktif/pasif nokta) bulunur.
  - Kart yapısı “ürün kartı” ile aynı görsel/isim/fiyat hiyerarşisini kullanır.
- **Sepet toplamı kartı**: sağda özet kutusu + geniş CTA butonu.
- **Footer**: 4 kolon link; altta ödeme ikonları; sağ altta “yukarı çık” butonu.

Bu alanlar için “pixel perfect” hedefleniyorsa, yeni geliştirmelerde değişiklik olduğunda ilgili ekran görüntüsü ile PR’da kıyas yapılır.

---

## 5. Host element

- Gerekirse `host: { class: '...' }` veya `host: { '[attr.role]': "'group'"' }` ile semantik host ayarı.

---

## 6. Erişilebilirlik (a11y)

- Etkileşimli öğe **`button` veya `a`** ile; `div` + `(click)` ile sahte buton yapma.
- Dekoratif görsellerde `alt=""` veya `role="presentation"`.
- Klavye ile kullanılabilirlik: odak görünür hale getir (`:focus-visible`).
- Form hataları: `aria-describedby` ile hata metnine bağla.

---

## 7. İsimlendirme özeti

| Öğe | Kural |
|-----|--------|
| Selector | `app-product-image` |
| Dosya | `product-image.component.ts` |
| Sınıf | `ProductImageComponent` |
| Olay | `selected` → `selectedChange` veya `select` output |

---

## 8. Import ve standalone

- **Standalone** bileşen: `imports: [CommonModule, ...]` açık liste; kullanılmayan import bırakma.
- Barrel (`index.ts`) sadece **dışa aktarımı** sadeleştiriyorsa; döngüsel import üretme.

---

## 9. Abonelikler ve async

- Uzun ömürlü Observable: `takeUntilDestroyed()` veya `async` pipe tercih et.
- `subscribe` içinde uzun blok yazma; `tap` / `switchMap` ile zincirle veya `toSignal`.

---

## 10. Test (minimum beklenti)

- Kritik organism’ler için **smoke** test: oluşturuluyor, önemli `@Input` ile DOM beklenen metni gösteriyor.
- Agent yeni organism ekliyorsa en az **bir** `.spec.ts` iskeleti öner.

---

## 11. Yasaklar ve kaçınılacaklar

- Atom içinde **HTTP** veya **Router** inject (feature’a bırak).
- `any`, gereksiz `eslint-disable`, ölü kod bırakma.
- Büyük görseli base64 ile şablona gömme.

---

## 12. Commit / PR mesajı ile uyum

- Anlamlı diff: tek PR’da hem atom hem unrelated feature değiştirme.
- UI değişikliğinde ekran görüntüsü veya kısa açıklama (insan reviewer için).

---

Bu dosya **agent ve insan geliştirici** için ortak sözleşmedir; çelişki durumunda `mimari.md` + ekip kararı önceliklidir.
