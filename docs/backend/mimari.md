# Backend mimarisi (.NET) — Agent referansı

Bu doküman **tomologo** e-ticaret API’si için katmanlar, veri akışı ve altyapı entegrasyonlarını tanımlar. Kod üretirken bu sınırlara uy.

---

## 1. Teknoloji

- **ASP.NET Core** (Web API veya Minimal APIs + açık modül sınırları).
- **PostgreSQL:** sipariş, ürün, kullanıcı, outbox tabloları.
- **Redis:** misafir sepeti, idempotency anahtarları, cache, rate limit verisi.
- **Kafka** (veya uyumlu broker): domain olayları (`cart.*`, `order.*`, `payment.*`).
- **Ödeme:** iyzico entegrasyonu (ödeme başlatma + webhook/callback).

---

## 2. Çözüm yapısı (önerilen projeler)

```text
Tomologo.sln
  src/
    Tomologo.Api/              # HTTP, DI composition, middleware
    Tomologo.Application/     # Use case, transaction sınırı, DTO mapping
    Tomologo.Domain/           # Entity, value object, domain events (saf)
    Tomologo.Infrastructure/   # EF Core, Redis, Kafka, iyzico HTTP
  tests/
    Tomologo.UnitTests/
    Tomologo.IntegrationTests/
```

- **Domain** projesi **Framework / EF / Redis / Kafka** referansı içermez (saf kalır).
- **Api** → Application + Infrastructure (implementasyon kaydı).

---

## 3. Katman sorumlulukları

| Katman | İçerik |
|--------|--------|
| **Domain** | `Order`, `CartLine`, `Money`, domain kuralları, `IDomainEvent` kayıtları. |
| **Application** | Command/handler veya servis metotları: `AddCartLine`, `CreateOrder`, `HandlePaymentSucceeded`. Transaction ve outbox tetikleme burada veya buradan çağrılan unit of work ile. |
| **Infrastructure** | `EfOrderRepository`, `KafkaEventPublisher`, `RedisCartStore`, `IyzicoWebhookValidator`, DbContext, migrations. |
| **Api** | Controller / endpoint, model binding, `ProblemDetails`, auth, correlation id. |

---

## 4. Repository ve Unit of Work

- **Repository:** kalıcılık soyutlaması; **IOrderRepository**, **IProductReadRepository** gibi arayüzler Domain veya Application’da tanımlanır (tercihen Application’da port, implementasyon Infrastructure’da — takım DDD stiline göre tek yer seçip sabitle).
- **Unit of Work:** aynı transaction içinde birden fazla aggregate veya outbox yazımı gerektiğinde `IUnitOfWork` / `DbContext` transaction.
- İş kuralı **repository içinde değil**; repository yalnızca sorgu ve kalıcı yazım.

---

## 5. Olaylar ve Outbox

- Kritik yazım: önce **PostgreSQL**’de iş + **Outbox** satırı aynı transaction’da.
- Arka planda **Outbox dispatcher** → Kafka’ya publish (retry, poison mesaj stratejisi).
- Tüketiciler: ayrı **Worker** process veya aynı host’ta `IHostedService` (MVP); üretimde ayrı deployment tercih edilir.
- Mesaj şeması: JSON + **sürüm alanı** (`schemaVersion`) veya Avro/Protobuf (ileride).

---

## 6. API tasarımı

- REST veya minimal REST + net resource isimleri: `/api/carts`, `/api/orders`, `/api/webhooks/iyzico`.
- **Idempotency-Key** header: sipariş oluşturma ve benzeri mutasyonlarda tekrar güvenliği.
- Hata gövdesi: **RFC 7807 ProblemDetails**; iç mesajları dışarı sızdırma.

---

## 7. Güvenlik

- Webhook: sağlayıcı imzası / doğrulama (iyzico dokümantasyonuna göre).
- JWT veya cookie session; HTTPS zorunlu.
- Hassas ayarlar: **User Secrets** (dev), **ortam değişkeni / secret store** (prod).

---

## 8. Gözlemlenebilirlik

- **Structured logging** (Serilog vb.): `CorrelationId`, `OrderId`, `CustomerId`.
- Sağlık: `/health` (DB + Redis + Kafka isteğe bağlı readiness).

---

## 9. İlgili dokümanlar

- Kod ve isimlendirme: **`code-standards.md`** (aynı klasör).
- Ürün genel mimari: `docs/ETICARET-MIMARI-YOL-HARITASI.md`.
- DevOps: `docs/DEVOPS-KUBERNETES-MIMARI.md`.

---

## 10. Agent checklist (PR öncesi)

- [ ] Domain’e altyapı referansı eklendi mi? (olmamalı)
- [ ] Mutasyon transaction + outbox tutarlı mı?
- [ ] Webhook idempotent ve imzası doğrulanıyor mu?
- [ ] Repository’de iş kuralı var mı? (olmamalı)
