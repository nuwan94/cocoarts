import { cacheLife, cacheTag } from "next/cache";

import { client } from "./client";
import { isSanityConfigured } from "./env";
import type { Category, Product, ProductSummary } from "./types";

const productSummary = `
  _id,
  name,
  "slug": slug.current,
  price,
  "inStock": coalesce(inStock, true),
  "image": images[0],
  category->{ title, "slug": slug.current }
`;

const categoryFields = `_id, title, "slug": slug.current, description, image`;

const productsQuery = `*[_type == "product" && defined(slug.current)] | order(_createdAt desc) { ${productSummary} }`;

const featuredProductsQuery = `*[_type == "product" && featured == true && defined(slug.current)] | order(_createdAt desc)[0...8] { ${productSummary} }`;

const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $slug && defined(slug.current)] | order(_createdAt desc) { ${productSummary} }`;

const productQuery = `*[_type == "product" && slug.current == $slug][0] { ${productSummary}, description, images, dimensions, madeBy }`;

const categoriesQuery = `*[_type == "category" && defined(slug.current)] | order(title asc) { ${categoryFields} }`;

const categoryQuery = `*[_type == "category" && slug.current == $slug][0] { ${categoryFields} }`;

// Content edits show up on the site within a few minutes.
async function fetchCached<T>(
  query: string,
  params: Record<string, string>,
  fallback: T,
): Promise<T> {
  "use cache";
  cacheLife("minutes");
  cacheTag("sanity");
  if (!isSanityConfigured) return fallback;
  return client.fetch<T>(query, params);
}

export const getProducts = () =>
  fetchCached<ProductSummary[]>(productsQuery, {}, []);

export const getFeaturedProducts = () =>
  fetchCached<ProductSummary[]>(featuredProductsQuery, {}, []);

export const getProductsByCategory = (slug: string) =>
  fetchCached<ProductSummary[]>(productsByCategoryQuery, { slug }, []);

export const getProduct = (slug: string) =>
  fetchCached<Product | null>(productQuery, { slug }, null);

export const getCategories = () =>
  fetchCached<Category[]>(categoriesQuery, {}, []);

export const getCategory = (slug: string) =>
  fetchCached<Category | null>(categoryQuery, { slug }, null);
