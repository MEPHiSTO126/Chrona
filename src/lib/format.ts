/**
 * Chrona Currency & Price Formatting Helper
 * Single source of truth for all price rendering in Chrona.
 * Enforces [R0] Project Tokens: Nigerian Naira (₦, U+20A6).
 */

export function formatPrice(amount: number): string {
  if (isNaN(amount)) return '₦0';
  const rounded = Math.round(amount);
  return `₦${rounded.toLocaleString('en-NG')}`;
}

export function formatPriceDecimal(amount: number): string {
  if (isNaN(amount)) return '₦0.00';
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
