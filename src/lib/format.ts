export const currency = process.env.NEXT_PUBLIC_CURRENCY || "LKR";
// wa.me links need digits only, so drop any "+", spaces or dashes.
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
  /\D/g,
  "",
);

export const canOrder = whatsappNumber.length > 0;

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function whatsappUrl(text: string) {
  if (!whatsappNumber) return null;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function whatsappOrderUrl(productName: string, price: number) {
  return whatsappUrl(
    `Hi CocoArts, I'd like to order: ${productName} (${formatPrice(price)})`,
  );
}

export function whatsappBasketUrl(
  items: { name: string; price: number; quantity: number }[],
  total: number,
) {
  const lines = items.map(
    (item) =>
      `- ${item.quantity} x ${item.name} (${formatPrice(item.price * item.quantity)})`,
  );
  return whatsappUrl(
    [
      "Hi CocoArts, I'd like to order:",
      ...lines,
      `Total: ${formatPrice(total)}`,
    ].join("\n"),
  );
}
