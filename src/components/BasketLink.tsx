"use client";

import Link from "next/link";

import { basketCount, useBasket } from "@/lib/basket";

export function BasketLink() {
  const count = basketCount(useBasket());

  return (
    <Link
      href="/basket"
      aria-label={count > 0 ? `Basket, ${count} items` : "Basket"}
      className="relative -m-2 p-2 hover:text-thambili"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9h18l-2 10a2 2 0 0 1-2 1.6H7A2 2 0 0 1 5 19L3 9Z" />
        <path d="M8 9a4 4 0 0 1 8 0" />
        <path d="M9 13v4M15 13v4M12 13v4" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-0.5 -right-1 grid min-w-5 place-items-center rounded-full bg-thambili px-1 text-xs font-bold text-shell">
          {count}
        </span>
      )}
    </Link>
  );
}
