import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Image } from "next-sanity/image";
import { Suspense } from "react";

import { ProductGrid } from "@/components/ProductGrid";
import { RichText } from "@/components/RichText";
import { absoluteUrl, baseOpenGraph } from "@/lib/site";
import { staticSlugs } from "@/lib/static-params";
import { urlFor } from "@/sanity/image";
import { getArtist, getArtists, getProductsByArtist } from "@/sanity/queries";

type Props = PageProps<"/artists/[slug]">;

export async function generateStaticParams() {
  return staticSlugs(await getArtists());
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtist(slug);
  if (!artist) return {};
  const url = absoluteUrl(`/artists/${artist.slug}`);
  const description =
    artist.intro ||
    `${artist.name} makes coconut shell art and craft by hand${artist.location ? ` in ${artist.location}` : ""}.`;
  return {
    title: artist.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...baseOpenGraph,
      type: "profile",
      url,
      title: artist.name,
      description,
      images: artist.photo && [
        {
          url: urlFor(artist.photo).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: artist.photo.alt || artist.name,
        },
      ],
    },
  };
}

async function ArtistProfile({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  const [artist, products] = await Promise.all([
    getArtist(slug),
    getProductsByArtist(slug),
  ]);
  if (!artist) notFound();

  return (
    <>
      <div className="grid items-end gap-10 md:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-husk/30">
          {artist.photo && (
            <Image
              src={urlFor(artist.photo).width(800).height(1000).url()}
              alt={artist.photo.alt || artist.name}
              width={800}
              height={1000}
              sizes="(min-width: 768px) 22rem, 100vw"
              preload
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="md:pb-6">
          {artist.location && (
            <p className="text-lg font-medium text-bark">{artist.location}</p>
          )}
          <h1 className="mt-2 font-display text-5xl leading-[1.05] sm:text-7xl">
            {artist.name}
          </h1>
          {artist.intro && (
            <p className="mt-6 max-w-prose text-xl leading-relaxed">
              {artist.intro}
            </p>
          )}
        </div>
      </div>

      {artist.story && artist.story.length > 0 && (
        <section className="mt-16">
          <RichText value={artist.story} />
        </section>
      )}

      <section className="mt-20">
        <h2 className="mb-10 font-display text-4xl sm:text-5xl">
          Made by {artist.name}
        </h2>
        <ProductGrid products={products} />
      </section>
    </>
  );
}

export default function ArtistPage({ params }: Props) {
  return (
    <div className="wrap pt-14">
      <Suspense
        fallback={
          <div className="aspect-[4/5] w-full max-w-[22rem] animate-pulse rounded-t-full bg-husk/30" />
        }
      >
        <ArtistProfile params={params} />
      </Suspense>
    </div>
  );
}
