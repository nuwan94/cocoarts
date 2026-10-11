import type { Metadata } from "next";

import { ProductGrid } from "@/components/ProductGrid";
import { getProducts } from "@/sanity/queries";

export const metadata: Metadata = { title: "Shop" };

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="wrap pt-14">
      <h1 className="mb-10 font-display text-5xl sm:text-6xl">All products</h1>
      <ProductGrid products={products} />
    </div>
  );
}
