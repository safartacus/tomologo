# Backend kod standartları (.NET / C#) — Agent referansı

`mimari.md` ile birlikte kullan. Amaç: okunabilir, test edilebilir, katman ihlali olmayan API kodu.

---

## 1. Dil ve derleyici

- **Nullable reference types** açık; uyarıları gerekçesiz bastırma (`#nullable disable` yaygın kullanılmasın).
- `var` okunabilirlik için uygun yerde; tip net değilse açık tip yaz.
- **File-scoped namespace** tercih edilir.

---

## 2. İsimlendirme

| Tür | Örnek |
|-----|--------|
| Sınıf / arayüz | `PascalCase` — `OrderService`, `IOrderRepository` |
| Metot | `PascalCase` — `CreateOrderAsync` |
| Yerel / parametre | `camelCase` — `orderId`, `customerEmail` |
| Özel alan | `_camelCase` veya `camelCase` (repo içi tek stil) |
| Sabit | `PascalCase` veya `UPPER_SNAKE` — takım seçimi sabit |
| Async | Tüm asenkron metotlarda `Async` soneki |

---

## 3. API katmanı

- Controller ince: doğrulama, HTTP kodu, **Application** çağrısı.
- **Record** veya ayrı **Request/Response DTO**; domain entity’yi doğrudan JSON’a dökme (serileştirme sızıntısı ve coupling).
- `CancellationToken` parametre olarak zincirden geçir.

---

## 4. Application katmanı

- Bir use case = bir sınıf veya net metot; `CreateOrderCommand` + `CreateOrderHandler` gibi (MediatR kullanılıyorsa tutarlılık).
- **Çoklu adım atomikliği:** `ExecuteInTransactionAsync` veya `DbContext.Database.BeginTransactionAsync`.
- Harici sistem (iyzico, Kafka): **port arayüzü** + Infrastructure implementasyonu.

---

## 5. Domain

- Entity’lerde **anlamsız** public setter yok; davranış metotları: `order.AddLine(...)`, `order.MarkPaid()`.
- Domain event: `record OrderCreated(OrderId Id, DateTimeOffset At) : IDomainEvent;` — saf veri veya minimal davranış.

---

## 6. Infrastructure

- **EF Core:** yapılandırma `IEntityTypeConfiguration<T>` ile ayrı dosyalar; `OnModelCreating` şişmesin.
- Migration: anlamlı isim; geri alınabilirlik düşünülür.
- Kafka: producer hata yönetimi, timeout; consumer’da **idempotent** işlem (işlenen `messageId` / offset stratejisi).

---

## 7. Özel durumlar ve hata

- Beklenen iş kuralı ihlali: **özel exception** veya `Result<T>` deseni; Api’de `ProblemDetails`’e map.
- `catch (Exception)` ile yutma; logla veya yeniden fırlat.

---

## 8. Güvenlik ve gizli bilgi

- Connection string, API key, webhook secret: **yalnız configuration**; loglama yok.
- Kart ham verisi işlenmez (iyzico ödeme tarafında kalır).

---

## 9. Test

- **Unit:** Domain ve Application (mock repository).
- **Integration:** Testcontainers ile PostgreSQL; kritik use case’ler.
- Webhook: imza doğrulama birimi ayrı test.

---

## 10. Yasaklar ve kaçınılacaklar

- Controller veya Handler içinde **ham SQL** dağınık (gerekirse tek repository metodunda topla).
- `Domain` projesinde `Microsoft.EntityFrameworkCore` paketi.
- Statik servis locator (`ServiceLocator.Current`).
- `async void` (yalnız event handler istisnası, dikkatli).

---

## 11. Dosya ve klasör

- Özellik bazlı klasör: `Orders/CreateOrderHandler.cs`, `Orders/Order.cs` veya `Features/Orders/...` — repo içinde **tek şema** seç.

---

## 12. Commit / PR

- Anlamlı mesaj; migration + kod aynı PR’da uyumlu.
- Breaking API değişikliğinde sürüm veya istemci notu.

---

Bu dosya **agent ve insan geliştirici** için ortak sözleşmedir; çelişki durumunda `mimari.md` + ekip kararı önceliklidir.
