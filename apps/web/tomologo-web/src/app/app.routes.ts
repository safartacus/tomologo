import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.page').then((m) => m.HomePage),
    title: 'TOMOLOGO',
  },
  {
    path: 'urun/:slug',
    loadComponent: () =>
      import('./pages/product-detail.page').then((m) => m.ProductDetailPage),
    title: 'Ürün',
  },
  {
    path: 'tum-urunler',
    loadComponent: () =>
      import('./pages/category.page').then((m) => m.CategoryPage),
    title: 'Tüm Ürünler',
    data: { catalogScope: 'all' },
  },
  {
    path: 'tum-urunler/:slug',
    loadComponent: () =>
      import('./pages/category.page').then((m) => m.CategoryPage),
    title: 'tüm ürünler',
  },
  {
    path: 'sepet',
    loadComponent: () => import('./pages/cart.page').then((m) => m.CartPage),
    title: 'Sepet',
  },
  { path: '**', redirectTo: '' },
];
