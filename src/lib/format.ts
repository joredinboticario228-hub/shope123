const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}

export function getDiscountedPrice(price: number, discountPercentage: number): number {
  return price * (1 - discountPercentage / 100);
}

export function formatReviewDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
