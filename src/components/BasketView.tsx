"use client";

import Link from "next/link";
import { Image } from "next-sanity/image";

import {
  basketTotal,
  clearBasket,
  maxQuantity,
  setQuantity,
  useBasket,
} from "@/lib/basket";
import { formatPrice, whatsappBasketUrl } from "@/lib/format";

const stepButton =
  "grid size-9 place-items-center rounded-full border border-husk text-lg leading-none hover:bg-husk hover:text-kernel disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-current";

export function BasketView() {
  const basket = useBasket();
  const total = basketTotal(basket);

  if (basket.length === 0) {
    return (
      <div className="mt-10 rounded-3xl border-2 border-dashed border-husk p-10 text-center">
        <p className="text-lg text-bark">Your basket is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-thambili px-7 py-3.5 font-semibold text-shell hover:bg-frond hover:text-kernel"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const orderUrl = whatsappBasketUrl(basket, total);

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-start">
      <ul className="min-w-0 divide-y divide-husk/40 border-y border-husk/40">
        {basket.map((item) => (
          <li key={item.slug} className="flex items-center gap-4 py-5 sm:gap-6">
            <Link
              href={`/products/${item.slug}`}
              className="size-20 shrink-0 overflow-hidden rounded-full bg-husk/30 sm:size-24"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt=""
                  width={192}
                  height={192}
                  sizes="6rem"
                  className="h-full w-full object-cover"
                />
              )}
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/products/${item.slug}`}
                className="font-display text-xl leading-tight hover:underline"
              >
                {item.name}
              </Link>
              <p className="text-bark">{formatPrice(item.price)} each</p>
              <div className="mt-3 flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  aria-label={`One fewer ${item.name}`}
                  onClick={() => setQuantity(item.slug, item.quantity - 1)}
                  className={stepButton}
                >
                  −
                </button>
                <span
                  aria-live="polite"
                  className="w-6 text-center font-semibold"
                >
                  {item.quantity}
                </span>
                <button
                  type="button"
                  aria-label={`One more ${item.name}`}
                  disabled={item.quantity >= maxQuantity}
                  onClick={() => setQuantity(item.slug, item.quantity + 1)}
                  className={stepButton}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setQuantity(item.slug, 0)}
                  className="ml-2 text-sm text-bark underline underline-offset-4 hover:text-shell"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="hidden self-start font-semibold whitespace-nowrap sm:block">
              {formatPrice(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <aside className="rounded-3xl bg-frond p-7 text-kernel">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-water">Total</span>
          <span className="font-display text-3xl">{formatPrice(total)}</span>
        </div>
        <p className="mt-4 text-sm text-water">
          Sending opens WhatsApp with your list. We&apos;ll reply to confirm
          availability, delivery and payment.
        </p>
        {orderUrl ? (
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full bg-thambili px-6 py-4 text-center text-lg font-semibold text-shell hover:bg-kernel"
          >
            Send order on WhatsApp
          </a>
        ) : (
          <p className="mt-6 text-sm text-water">
            Set NEXT_PUBLIC_WHATSAPP_NUMBER to enable ordering.
          </p>
        )}
        <button
          type="button"
          onClick={clearBasket}
          className="mt-4 w-full text-sm text-water underline underline-offset-4 hover:text-kernel"
        >
          Empty basket
        </button>
      </aside>
    </div>
  );
}
