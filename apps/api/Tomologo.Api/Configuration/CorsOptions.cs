namespace Tomologo.Api.Configuration;

public sealed class CorsOptions
{
    public const string SectionName = "Cors";

    /// <summary>İstemci kökenleri (ör. Angular dev sunucusu).</summary>
    public string[] AllowedOrigins { get; set; } = [];
}
