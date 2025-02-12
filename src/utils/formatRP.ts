export const formatPrice = (price: number) =>
  price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
