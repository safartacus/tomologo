import { Injectable, computed, signal } from '@angular/core';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class MockCartStore {
  private readonly _items = signal<CartItem[]>([]);

  readonly items = this._items.asReadonly();

  readonly totalQuantity = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly subTotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  );

  addItem(payload: Omit<CartItem, 'id'>): void {
    this._items.update((items) => {
      const existing = items.find(
        (x) => x.slug === payload.slug && x.color === payload.color,
      );
      if (!existing) {
        const id = `${payload.slug}-${payload.color ?? 'default'}`;
        return [...items, { ...payload, id }];
      }
      return items.map((item) =>
        item.id === existing.id
          ? { ...item, quantity: item.quantity + payload.quantity }
          : item,
      );
    });
  }

  increase(id: string): void {
    this._items.update((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  decrease(id: string): void {
    this._items.update((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  remove(id: string): void {
    this._items.update((items) => items.filter((x) => x.id !== id));
  }
}

