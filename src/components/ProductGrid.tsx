import Link from "next/link";
import { Image } from "next-sanity/image";

import { formatPrice } from "@/lib/format";
import { urlFor } from "@/sanity/image";
import type { ProductSummary } from "@/sanity/types";

// No two shells are cut alike, so neighbouring photos get different outlines.
const shapes = [
  "58% 42% 55% 45% / 48% 56% 44% 52%",
  "44% 56% 47% 53% / 55% 45% 55% 45%",
  "52% 48% 40% 60% / 46% 52% 48% 54%",
  "47% 53% 58% 42% / 57% 44% 56% 43%",
];

function ProductCard({
  product,
  shape,
}: {
  product: ProductSummary;
  shape: string;
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div
        className="aspect-square overflow-hidden bg-husk/30 transition-[border-radius] duration-500 group-hover:!rounded-[50%]"
        style={{ borderRadius: shape }}
      >
        {product.image && (
          <Image
            src={urlFor(product.image).width(600).height(600).url()}
            alt={product.image.alt || product.name}
            width={600}
            height={600}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <h3 className="mt-4 font-display text-xl leading-tight decoration-thambili decoration-wavy underline-offset-4 group-hover:underline">
        {product.name}
      </h3>
      <p className="mt-1 text-bark">
        {formatPrice(product.price)}
        {!product.inStock && ", sold out"}
      </p>
    </Link>
  );
}

export function ProductGrid({ products }: { products: ProductSummary[] }) {
  if (products.length === 0) {
    return (
      <p className="rounded-3xl border-2 border-dashed border-husk p-10 text-center text-bark">
        Nothing on the shelf yet. Add a product in the{" "}
        <Link href="/studio" className="underline">
          studio
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          shape={shapes[index % shapes.length]}
        />
      ))}
    </div>
  );
}
