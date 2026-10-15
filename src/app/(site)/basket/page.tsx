import type { Metadata } from "next";

import { BasketView } from "@/components/BasketView";

export const metadata: Metadata = {
  title: "Your basket",
  robots: { index: false },
};

export default function BasketPage() {
  return (
    <div className="wrap pt-14">
      <h1 className="font-display text-5xl sm:text-6xl">Your basket</h1>
      <BasketView />
    </div>
  );
}
