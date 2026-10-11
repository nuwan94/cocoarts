import Link from "next/link";

import { CoconutFrame } from "@/components/CoconutFrame";
import { PalaPeti } from "@/components/Motifs";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getCategories,
  getFeaturedProducts,
  getProducts,
} from "@/sanity/queries";

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);
  // Until something is marked as featured, show the newest products instead.
  const products =
    featured.length > 0 ? featured : (await getProducts()).slice(0, 8);
  const hero = products[0];

  return (
    <>
      <section className="relative bg-frond text-kernel">
        <PalaPeti className="absolute inset-x-0 bottom-0 text-water" />
        <div className="wrap relative grid items-center gap-10 pt-10 pb-16 md:grid-cols-[1.15fr_1fr] md:pt-16 md:pb-0">
          <div className="md:pb-24">
            <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              Carved from what the coconut leaves behind.
            </h1>
            <p className="mt-6 max-w-md text-lg text-water">
              Elephants, bowls, lamps and jewellery, cut and polished by hand
              from coconut shell.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-block rounded-full bg-thambili px-7 py-3.5 font-semibold text-shell hover:bg-kernel"
            >
              Shop all products
            </Link>
          </div>
          <div className="mx-auto w-full max-w-sm md:max-w-none md:translate-y-20">
            {hero ? (
              <Link
                href={`/products/${hero.slug}`}
                aria-label={hero.name}
                className="block rounded-full"
              >
                <CoconutFrame
                  image={hero.image}
                  alt={hero.image?.alt || hero.name}
                />
              </Link>
            ) : (
              <CoconutFrame alt="" />
            )}
          </div>
        </div>
      </section>

      <section className="wrap pt-20 md:pt-40">
        <h2 className="mb-10 font-display text-4xl sm:text-5xl">
          {featured.length > 0 ? "Featured pieces" : "Fresh off the bench"}
        </h2>
        <ProductGrid products={products} />
      </section>

      {categories.length > 0 && (
        <section id="categories" className="wrap pt-24">
          <h2 className="text-lg font-medium text-bark">Browse by kind</h2>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-2">
            {categories.map((category) => (
              <li key={category._id}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="font-display text-5xl leading-tight decoration-thambili decoration-wavy decoration-2 underline-offset-8 hover:underline sm:text-7xl"
                >
                  {category.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
