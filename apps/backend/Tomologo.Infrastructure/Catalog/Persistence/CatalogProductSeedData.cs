using System.Text.Json;

namespace Tomologo.Infrastructure.Catalog.Persistence;

/// <summary>Seed satırı: fiyatlar <c>product_prices</c>, stok <c>product_stocks</c> ile eşleşir.</summary>
public sealed record CatalogProductSeedRow(
    Guid Id,
    string Slug,
    string Name,
    string? Brand,
    string CategorySlug,
    string Image,
    string Description,
    string ColorsJson,
    IReadOnlyList<(string Currency, decimal Amount)> Prices,
    int QuantityOnHand,
    int QuantityReserved);

/// <summary>
/// Katalog seed listesi. Uygulama açılışında slug ile upsert edilir; kimlikler
/// <see cref="Guid.CreateVersion7"/> ile üretilir (elle Guid yazılmaz).
/// </summary>
public static class CatalogProductSeedData
{
    private static readonly JsonSerializerOptions JsonWrite = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    public static IReadOnlyList<CatalogProductSeedRow> Rows { get; } = BuildRows();

    private static IReadOnlyList<CatalogProductSeedRow> BuildRows() =>
        new List<CatalogProductSeedRow>
        {
            // —— Revive Mini Clutch ——
            Row(
                "mini-clutch-kemik",
                "Revive Mini Clutch - Kemik Rengi",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-kemik.jpg",
                "Revive mini clutch, günlük kullanım için ideal, zamansız bir modeldir.",
                new (string Name, string Hex)[]
                {
                    ("Kemik", "#dad6c4"),
                    ("Koyu Kahverengi", "#4b3427"),
                    ("Vizon", "#b8ad94"),
                    ("Koi Yılan", "#7a523c"),
                    ("Yeşil Yılan", "#2e5f59"),
                    ("Nude", "#d9d2bf"),
                },
                148m),
            Row(
                "mini-clutch-yag-tey",
                "Revive Mini Clutch - Yağ Tey",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-yag-tey.jpg",
                "Yağ tey tonuyla öne çıkan kompakt ve şık günlük model.",
                [("Yağ Tey", "#6b4d35")]),
            Row(
                "mini-clutch-yesil-yilan",
                "Revive Mini Clutch - Yeşil Yılan",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-yesil-yilan.jpg",
                "Doku ve renk dengesiyle güçlü bir görünüm sunar.",
                [("Yeşil Yılan", "#2e5f59")]),
            Row(
                "mini-clutch-vizon",
                "Revive Mini Clutch - Vizon",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-vizon.jpg",
                "Nötr vizon tonu ile her kombine uyum sağlar.",
                [("Vizon", "#b8ad94")]),
            Row(
                "mini-clutch-koi",
                "Revive Mini Clutch - Koi Yılan",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-koi-yilan.jpg",
                "Koi desenli yüzeyi ile koleksiyonun dikkat çeken parçası.",
                [("Koi Yılan", "#7a523c")]),
            Row(
                "mini-clutch-koyu-kahverengi",
                "Revive Mini Clutch - Koyu Kahverengi",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-koyu-kahverengi.jpg",
                "Koyu ton severler için güçlü ve sade bir alternatif.",
                [("Koyu Kahverengi", "#4b3427")]),
            Row(
                "mini-clutch-nude",
                "Revive Mini Clutch - Nude",
                "mini-clutch",
                5500m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/revive-mini-clutch-nude.jpg",
                "Nude tonlarıyla zarif ve minimal görünüm.",
                [("Nude", "#d9d2bf")]),
            Row(
                "tune-yag-mixi-tote-canta",
                "TUNE YAĞ MİXİ TOTE ÇANTA",
                "tote-canta",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2025/01/tune-yag-mixi-tote-canta.jpg",
                "Geniş iç hacim ve imza detaylarla premium tote model.",
                [("Yağ Mixi", "#8f825c")],
                605m),

            // —— T LINE Tote ——
            Row(
                "tline-tote-siyah-aski-bej",
                "T LINE SİYAH ASKILI BEJ TOTE ÇANTA",
                "tline-tote",
                25000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-tline-siyah-aski-bej-tote-canta-6-680x920.jpg",
                "T Line tote; siyah askı ve bej gövde kombinasyonu.",
                [("Bej / Siyah", "#6b5d4a")]),
            Row(
                "tline-tote-bej-aski-siyah",
                "T LINE BEJ ASKILI SİYAH TOTE ÇANTA",
                "tline-tote",
                25000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-tline-bej-aski-siyah-tote-canta-8-680x920.jpg",
                "T Line tote; bej askı ve siyah gövde.",
                [("Siyah / Bej", "#2c2c2c")]),
            Row(
                "tline-tote-taba",
                "T LINE TABA TOTE ÇANTA",
                "tline-tote",
                25000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/Taba-T-line-Tote-canta-2-2.jpg",
                "T Line tote, taba deri tonu.",
                [("Taba", "#7a523c")]),
            Row(
                "tline-tote-bej",
                "T LINE BEJ TOTE ÇANTA",
                "tline-tote",
                25000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-tline-bej-tote-canta-8-680x920.jpg",
                "T Line tote, bej tonu.",
                [("Bej", "#c4b8a8")]),
            Row(
                "tline-tote-gri",
                "T LINE GRİ TOTE ÇANTA",
                "tline-tote",
                25000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/Gri-T-line-Tote-canta-2.jpg",
                "T Line tote, gri tonu.",
                [("Gri", "#8a8a8a")]),
            Row(
                "tline-tote-taba-aski-siyah",
                "T LINE TABA ASKILI SİYAH TOTE ÇANTA",
                "tline-tote",
                25000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/taba-aski-siyah-T-line-Tote-canta-2.jpg",
                "T Line tote; taba askı ve siyah gövde.",
                [("Siyah / Taba", "#3d2a22")]),

            // —— T LINE Çapraz ——
            Row(
                "tline-capraz-taba",
                "T LINE TABA ÇAPRAZ ÇANTA",
                "tline-capraz",
                22000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-tline-taba-capraz-canta-6-680x920.jpg",
                "T Line çapraz çanta, taba tonu.",
                [("Taba", "#7a523c")]),
            Row(
                "tline-capraz-acik-mavi",
                "T LINE MAVİ ÇAPRAZ ÇANTA",
                "tline-capraz",
                22000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-tline-mavi-capraz-canta-6-1-680x920.jpg",
                "T Line çapraz çanta, açık mavi tonu.",
                [("Açık Mavi", "#6b8cae")]),
            Row(
                "tline-capraz-bej",
                "T LINE BEJ ÇAPRAZ ÇANTA",
                "tline-capraz",
                22000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tomologo-tline-bej-capraz-canta-5-680x920.jpg",
                "T Line çapraz çanta, bej tonu.",
                [("Bej", "#c4b8a8")]),
            Row(
                "tline-capraz-gri",
                "T LINE GRİ ÇAPRAZ ÇANTA",
                "tline-capraz",
                22000m,
                "https://tomologo-official.com/wp-content/uploads/2021/06/tline-capraz-canta-gri-1-1.jpg",
                "T Line çapraz çanta, gri tonu.",
                [("Gri", "#8a8a8a")]),

            // —— T LINE Mini Tote ——
            Row(
                "tline-mini-tote-taba-aski-bej",
                "T LINE TABA ASKILI BEJ MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-taba-aski-bej-1-1.jpg",
                "T Line mini tote; taba askı ve bej gövde.",
                [("Bej / Taba", "#a89078")]),
            Row(
                "tline-mini-tote-kemik-aski-siyah",
                "T LINE KEMİK ASKILI SİYAH MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-kemik-aski-siyah-1.jpg",
                "T Line mini tote; kemik askı ve siyah gövde.",
                [("Siyah / Kemik", "#2a2a28")]),
            Row(
                "tline-mini-tote-taba-aski-siyah",
                "T LINE TABA ASKILI SİYAH MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-taba-aski-siyah-1-1.jpg",
                "T Line mini tote; taba askı ve siyah gövde.",
                [("Siyah / Taba", "#3d2a22")]),
            Row(
                "tline-mini-tote-gri",
                "T LINE GRİ MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-gri-1-1.jpg",
                "T Line mini tote, gri tonu.",
                [("Gri", "#8a8a8a")]),
            Row(
                "tline-mini-tote-kemik",
                "T LINE KEMİK MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-kemik-1-1.jpg",
                "T Line mini tote, kemik tonu.",
                [("Kemik", "#dad6c4")]),
            Row(
                "tline-mini-tote-pembe",
                "T LINE PEMBE MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-pembe-1-1.jpg",
                "T Line mini tote, pembe tonu.",
                [("Pembe", "#e8b4b8")]),
            Row(
                "tline-mini-tote-siyah",
                "T LINE SİYAH MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-siyah-1-1.jpg",
                "T Line mini tote, siyah tonu.",
                [("Siyah", "#1a1a1a")]),
            Row(
                "tline-mini-tote-taba",
                "T LINE TABA MİNİ TOTE ÇANTA",
                "tline-mini-tote",
                22500m,
                "https://tomologo-official.com/wp-content/uploads/2023/03/tline-mini-tote-taba1.jpg",
                "T Line mini tote, taba tonu.",
                [("Taba", "#7a523c")]),

            // —— Revive Mini Kartlık ——
            Row(
                "revive-mini-kartlik-siyah-devekusu",
                "Revive Mini Kartlık - Siyah Devekuşu Baskı",
                "revive-kartlik",
                1950m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/Revive-mini-kartlik-siyah-devekusu-1--680x920.jpg",
                "Revive mini kartlık, siyah zemin üzerinde devekuşu desenli baskı.",
                [("Siyah Devekuşu", "#2a2420")]),
            Row(
                "revive-mini-kartlik-siyah-kroko",
                "Revive Mini Kartlık - Siyah Kroko Baskı",
                "revive-kartlik",
                1950m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/Revive-mini-kartlik-siyah-kroko1--680x920.jpg",
                "Revive mini kartlık, siyah kroko dokulu baskı.",
                [("Siyah Kroko", "#1c1c1c")]),
            Row(
                "revive-mini-kartlik-vatoz",
                "Revive Mini Kartlık - Vatoz Baskı",
                "revive-kartlik",
                1950m,
                "https://tomologo-official.com/wp-content/uploads/2024/11/Revive-mini-kartlik-vatoz-1--680x920.jpg",
                "Revive mini kartlık, vatoz desenli baskı.",
                [("Vatoz", "#5c6b7a")]),
        };

    /// <param name="euroPriceAmount">Sabit EUR liste fiyatı; null ise EUR vitrinde kullanılmaz.</param>
    /// <param name="quantityOnHand">Stok (eldeki adet).</param>
    /// <param name="quantityReserved">Rezerve adet.</param>
    private static CatalogProductSeedRow Row(
        string slug,
        string name,
        string categorySlug,
        decimal price,
        string image,
        string description,
        IReadOnlyList<(string Name, string Hex)> colors,
        decimal? euroPriceAmount = null,
        int quantityOnHand = 40,
        int quantityReserved = 0)
    {
        var priceRows = new List<(string Currency, decimal Amount)> { ("TRY", price) };
        if (euroPriceAmount is not null)
        {
            priceRows.Add(("EUR", euroPriceAmount.Value));
        }

        var colorDtos = colors.Select(c => new { name = c.Name, hex = c.Hex }).ToArray();
        return new CatalogProductSeedRow(
            Guid.CreateVersion7(),
            slug,
            name,
            "Tomologo",
            categorySlug,
            image,
            description,
            JsonSerializer.Serialize(colorDtos, JsonWrite),
            priceRows,
            quantityOnHand,
            quantityReserved);
    }
}
