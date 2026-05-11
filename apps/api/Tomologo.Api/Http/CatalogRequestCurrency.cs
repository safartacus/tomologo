namespace Tomologo.Api.Http;

internal static class CatalogRequestCurrency
{
    internal const string HeaderName = "X-Catalog-Currency";
    internal const string QueryName = "currency";

    /// <summary>Öncelik: query, sonra header. Geçersiz/boş ise null.</summary>
    public static string? Read(HttpRequest request)
    {
        var q = request.Query[QueryName].FirstOrDefault();
        if (!string.IsNullOrWhiteSpace(q))
        {
            return q.Trim();
        }

        if (request.Headers.TryGetValue(HeaderName, out var h))
        {
            var v = h.FirstOrDefault();
            if (!string.IsNullOrWhiteSpace(v))
            {
                return v.Trim();
            }
        }

        return null;
    }
}
