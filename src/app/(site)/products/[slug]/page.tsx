import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Image } from "next-sanity/image";
import { Suspense } from "react";

import { RichText } from "@/components/RichText";
import { formatPrice, whatsappOrderUrl } from "@/lib/format";
import { urlFor } from "@/sanity/image";
import { getProduct, getProducts } from "@/sanity/queries";

type Props = PageProps<"/products/[slug]">;

const photoShape = "rounded-[46%_54%_42%_58%/52%_44%_56%_48%]";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name, description: product?.description };
}

async function ProductDetails({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [mainImage, ...otherImages] = product.images ?? [];
  const orderUrl = whatsappOrderUrl(product.name, product.price);

  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <div>
        <div
          className={`aspect-square overflow-hidden bg-husk/30 ${photoShape}`}
        >
          {mainImage && (
            <Image
              src={urlFor(mainImage).width(1000).height(1000).url()}
              alt={mainImage.alt || product.name}
              width={1000}
              height={1000}
              sizes="(min-width: 768px) 50vw, 100vw"
              preload
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {otherImages.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {otherImages.map((image) => (
              <div
                key={image.asset._ref}
                className="size-24 overflow-hidden rounded-full bg-husk/30"
              >
                <Image
                  src={urlFor(image).width(300).height(300).url()}
                  alt={image.alt || product.name}
                  width={300}
                  height={300}
                  sizes="6rem"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {product.category && (
          <Link
            href={`/categories/${product.category.slug}`}
            className="font-medium text-bark underline decoration-thambili decoration-wavy underline-offset-4"
          >
            {product.category.title}
          </Link>
        )}
        <h1 className="mt-3 font-display text-5xl leading-[1.05] sm:text-6xl">
          {product.name}
        </h1>
        <p className="mt-4 font-display text-3xl text-frond">
          {formatPrice(product.price)}
        </p>

        {product.description && (
          <p className="mt-6 max-w-prose text-lg leading-relaxed whitespace-pre-line">
            {product.description}
          </p>
        )}

        <dl className="mt-6 space-y-1">
          {product.dimensions && (
            <div className="flex gap-2">
              <dt className="text-bark">Size</dt>
              <dd>{product.dimensions}</dd>
            </div>
          )}
          {product.madeBy && (
            <div className="flex gap-2">
              <dt className="text-bark">Made by</dt>
              <dd>{product.madeBy}</dd>
            </div>
          )}
        </dl>

        <div className="mt-10">
          {!product.inStock ? (
            <p className="font-display text-2xl text-bark">Sold out</p>
          ) : orderUrl ? (
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-thambili px-8 py-4 text-lg font-semibold text-shell hover:bg-frond hover:text-kernel"
            >
              Order via WhatsApp
            </a>
          ) : (
            <p className="text-sm text-bark">
              Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local to enable ordering.
            </p>
          )}
        </div>
      </div>
      {product.details && product.details.length > 0 && (
        <section className="mt-20 md:col-span-2">
          <RichText value={product.details} />
        </section>
      )}
    </div>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <div className="wrap pt-14">
      <Suspense
        fallback={
          <div className="grid gap-12 md:grid-cols-2">
            <div
              className={`aspect-square animate-pulse bg-husk/30 ${photoShape}`}
            />
          </div>
        }
      >
        <ProductDetails params={params} />
      </Suspense>
    </div>
  );
}
