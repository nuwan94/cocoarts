"use client";

import Link from "next/link";

import { addToBasket, type BasketItem, useBasket } from "@/lib/basket";

export function AddToBasket({ item }: { item: Omit<BasketItem, "quantity"> }) {
  const basket = useBasket();
  const inBasket = basket.find((entry) => entry.slug === item.slug)?.quantity;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <button
        type="button"
        onClick={() => addToBasket(item)}
        className="rounded-full bg-thambili px-8 py-4 text-lg font-semibold text-shell hover:bg-frond hover:text-kernel"
      >
        {inBasket ? "Add another" : "Add to basket"}
      </button>
      {inBasket && (
        <p aria-live="polite" className="text-bark">
          {inBasket} in your basket.{" "}
          <Link
            href="/basket"
            className="font-medium text-shell underline decoration-thambili decoration-wavy underline-offset-4"
          >
            View basket
          </Link>
        </p>
      )}
    </div>
  );
}
