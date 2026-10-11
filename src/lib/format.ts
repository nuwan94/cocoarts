export const currency = process.env.NEXT_PUBLIC_CURRENCY || "LKR";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function whatsappOrderUrl(productName: string, price: number) {
  if (!whatsappNumber) return null;
  const text = `Hi CocoArts, I'd like to order: ${productName} (${formatPrice(price)})`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
