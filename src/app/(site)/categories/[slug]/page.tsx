import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductGrid } from "@/components/ProductGrid";
import { absoluteUrl, baseOpenGraph } from "@/lib/site";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "@/sanity/queries";

type Props = PageProps<"/categories/[slug]">;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  const url = absoluteUrl(`/categories/${category.slug}`);
  const description =
    category.description ||
    `Handmade coconut shell ${category.title.toLowerCase()} from CocoArts.`;
  return {
    title: category.title,
    description,
    alternates: { canonical: url },
    openGraph: { ...baseOpenGraph, url, title: category.title, description },
  };
}

async function CategoryProducts({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);
  if (!category) notFound();

  return (
    <>
      <h1 className="font-display text-5xl sm:text-6xl">{category.title}</h1>
      {category.description && (
        <p className="mt-4 max-w-2xl text-lg text-bark">
          {category.description}
        </p>
      )}
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </>
  );
}

export default function CategoryPage({ params }: Props) {
  return (
    <div className="wrap pt-14">
      <Suspense
        fallback={
          <div className="h-14 w-56 animate-pulse rounded-full bg-husk/30" />
        }
      >
        <CategoryProducts params={params} />
      </Suspense>
    </div>
  );
}
