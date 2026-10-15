import Link from "next/link";

import { BasketLink } from "@/components/BasketLink";
import { Moonstone, PalaPeti } from "@/components/Motifs";
import { SetupNotice } from "@/components/SetupNotice";
import { isSanityConfigured } from "@/sanity/env";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="bg-frond text-kernel">
        <div className="wrap flex items-center justify-between py-5">
          <Link href="/" className="font-display text-2xl sm:text-3xl">
            CocoArts
          </Link>
          <nav className="flex items-center gap-4 font-medium sm:gap-6">
            <Link
              href="/products"
              className="decoration-thambili decoration-wavy underline-offset-8 hover:underline"
            >
              Shop
            </Link>
            <Link
              href="/artists"
              className="decoration-thambili decoration-wavy underline-offset-8 hover:underline"
            >
              Artists
            </Link>
            <Link
              href="/#categories"
              className="hidden decoration-thambili decoration-wavy underline-offset-8 hover:underline sm:inline"
            >
              Categories
            </Link>
            <BasketLink />
          </nav>
        </div>
      </header>
      {!isSanityConfigured && <SetupNotice />}
      <main className="flex-1">{children}</main>
      <PalaPeti className="mt-24 text-frond" />
      <footer className="bg-frond text-water">
        <div className="wrap flex flex-wrap items-end justify-between gap-x-6 gap-y-10 pt-12">
          <div className="pb-12">
            <p className="font-display text-5xl text-kernel sm:text-7xl">
              CocoArts
            </p>
            <p className="mt-4 max-w-xs">
              Cut, carved and polished by hand from coconut shell.
            </p>
          </div>
          <Moonstone className="mx-auto block w-full max-w-sm sm:mx-0" />
        </div>
      </footer>
    </>
  );
}
