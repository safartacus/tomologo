import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CATALOG_API_BASE_URL } from './catalog-api-base';

export interface HomepageCampaign {
  title: string;
  isActive: boolean;
  campaignName: string;
}

export interface HomepageBanner {
  bannerTitle: string;
  url: string;
}

export interface HomepageReviveSpotlightItem {
  name: string;
  image: string;
  slug: string;
}

export interface HomepageReviveSpotlight {
  isActive: boolean;
  items: HomepageReviveSpotlightItem[];
}

export interface HomepageReviveStory {
  isActive: boolean;
  text: string;
}

export interface HomepageResponse {
  campaign: HomepageCampaign;
  banner: HomepageBanner;
  reviveSpotlight: HomepageReviveSpotlight;
  reviveStory: HomepageReviveStory;
}

/** API yanıtı ile aynı; ağ hatasında ana sayfa boş kalmaz. */
export const DEFAULT_HOMEPAGE_RESPONSE: HomepageResponse = {
  campaign: {
    title: 'ANNELER GÜNÜNE ÖZEL "ANNELERGÜNÜ30" KODUYLA SEPETTE %30 İNDİRİM!',
    isActive: true,
    campaignName: 'motherday',
  },
  banner: {
    bannerTitle: 'defaultBanner',
    url: 'https://tomologo-official.com/wp-content/uploads/2024/12/tomologo-canta-banner-scaled.jpg',
  },
  reviveSpotlight: {
    isActive: true,
    items: [
      {
        name: 'Revive Clutch – Kahverengi Süet',
        image:
          'https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-suet-kahve-1-y-768x1024.jpg',
        slug: 'mini-clutch-koyu-kahverengi',
      },
      {
        name: 'Revive Clutch – Kemik',
        image:
          'https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-BT-kemik-1-y-768x1024.jpg',
        slug: 'mini-clutch-kemik',
      },
      {
        name: 'Revive Clutch – Kızıl Yılan',
        image:
          'https://tomologo-official.com/wp-content/uploads/2024/12/Revive-Clutch-baski-yilan-turuncu-1-768x1024.jpg',
        slug: 'mini-clutch-koi',
      },
    ],
  },
  reviveStory: {
    isActive: true,
    text:
      "20 yıl önce üç küçük kızın modayı oyunlaştırarak yarattığı renkli dünyanın bize armağanı olan TOMOLOGO'nun kalbinde usta zanaatkarların elinden çıkmış zamansız ve fonksiyonel parçalar yatar.",
  },
};

@Injectable({ providedIn: 'root' })
export class HomepageApiService {
  private readonly http = inject(HttpClient);

  getHomepage() {
    return this.http.get<HomepageResponse>(`${CATALOG_API_BASE_URL}/api/homepage`);
  }
}
