import type { Metadata } from "next";
import Link from "next/link";
import { Image } from "next-sanity/image";

import { absoluteUrl, baseOpenGraph } from "@/lib/site";
import { urlFor } from "@/sanity/image";
import { getArtists } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "The artists",
  description:
    "Meet the Sri Lankan artisans who cut, carve and polish every CocoArts piece by hand.",
  alternates: { canonical: absoluteUrl("/artists") },
  openGraph: { ...baseOpenGraph, url: absoluteUrl("/artists") },
};

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="wrap pt-14">
      <h1 className="font-display text-5xl sm:text-6xl">The artists</h1>
      <p className="mt-4 max-w-xl text-lg text-bark">
        Every piece is made by a person, not a factory. These are the hands
        behind the work.
      </p>

      {artists.length === 0 ? (
        <p className="mt-10 rounded-3xl border-2 border-dashed border-husk p-10 text-center text-bark">
          No artists yet. Add one in the{" "}
          <Link href="/studio" className="underline">
            studio
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <li key={artist._id}>
              <Link href={`/artists/${artist.slug}`} className="group block">
                <div className="aspect-[4/5] overflow-hidden rounded-t-full bg-husk/30">
                  {artist.photo && (
                    <Image
                      src={urlFor(artist.photo).width(640).height(800).url()}
                      alt={artist.photo.alt || artist.name}
                      width={640}
                      height={800}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <h2 className="mt-5 font-display text-3xl leading-tight decoration-thambili decoration-wavy underline-offset-4 group-hover:underline">
                  {artist.name}
                </h2>
                {artist.location && (
                  <p className="mt-1 text-bark">{artist.location}</p>
                )}
                {artist.intro && (
                  <p className="mt-3 leading-relaxed">{artist.intro}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
