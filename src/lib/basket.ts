import { useSyncExternalStore } from "react";

// The basket lives in the visitor's browser (localStorage), so it works on a
// static site with no server. Prices are copied when an item is added; the
// order is confirmed over WhatsApp, where the final price is agreed.

export type BasketItem = {
  slug: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

export const maxQuantity = 20;

const storageKey = "cocoarts-basket";
const listeners = new Set<() => void>();
const empty: BasketItem[] = [];
let items: BasketItem[] | null = null;

function read(): BasketItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(next: BasketItem[]) {
  items = next;
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    // Private browsing or blocked storage: the basket still works until reload.
  }
  listeners.forEach((listener) => listener());
}

function getBasket() {
  if (items === null) items = read();
  return items;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep other open tabs in step.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    items = read();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useBasket() {
  return useSyncExternalStore(subscribe, getBasket, () => empty);
}

export function addToBasket(item: Omit<BasketItem, "quantity">) {
  const current = getBasket();
  const existing = current.find((entry) => entry.slug === item.slug);
  write(
    existing
      ? current.map((entry) =>
          entry.slug === item.slug
            ? {
                ...entry,
                quantity: Math.min(entry.quantity + 1, maxQuantity),
              }
            : entry,
        )
      : [...current, { ...item, quantity: 1 }],
  );
}

export function setQuantity(slug: string, quantity: number) {
  const current = getBasket();
  write(
    quantity <= 0
      ? current.filter((entry) => entry.slug !== slug)
      : current.map((entry) =>
          entry.slug === slug
            ? { ...entry, quantity: Math.min(quantity, maxQuantity) }
            : entry,
        ),
  );
}

export function clearBasket() {
  write([]);
}

export function basketCount(basket: BasketItem[]) {
  return basket.reduce((sum, entry) => sum + entry.quantity, 0);
}

export function basketTotal(basket: BasketItem[]) {
  return basket.reduce((sum, entry) => sum + entry.price * entry.quantity, 0);
}
