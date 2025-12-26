/**
 * Currency Formatters and Converters
 * A comprehensive collection of currency formatting and conversion utilities
 */
import { isNil, isInteger, isNumber, isString, isFinite } from 'lodash-es';
import {
  getCurrencySymbol,
  getCurrencyInfo,
  getCurrencyName,
  isValidCurrencyCode,
  getAllCurrencyCodes,
  searchCurrencies,
  type CurrencyInfo,
  type FormattedCurrency,
} from './currencySymbol';

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_FALLBACK = 'N/A';
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_CURRENCY_SYMBOL = '$';
const DEFAULT_DECIMAL_PLACES = 2;
const CENTS_PER_DOLLAR = 100;

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Add thousand separators (commas) to a number string
 */
export const addCommas = (value: string | number): string => {
  if (typeof value === 'number' && !isFinite(value)) {
    return DEFAULT_FALLBACK;
  }

  const str = String(value);
  if (str === 'NaN' || str === 'Infinity' || str === '-Infinity') {
    return DEFAULT_FALLBACK;
  }

  const parts = str.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? `.${parts[1]}` : '';

  const rgx = /(\d+)(\d{3})/;
  let formattedInteger = integerPart;

  while (rgx.test(formattedInteger)) {
    formattedInteger = formattedInteger.replace(rgx, '$1,$2');
  }

  return formattedInteger + decimalPart;
};

// ============================================================================
// Dollar to Cents Conversions
// ============================================================================

/**
 * Convert dollars to cents
 * @param dollars - Amount in dollars
 * @returns Amount in cents or "N/A" if invalid
 */
export const dollarToCents = (dollars: number | null | undefined): number | string => {
  if (isNil(dollars)) {
    return DEFAULT_FALLBACK;
  }

  if (!isNumber(dollars) || !isFinite(dollars)) {
    return NaN;
  }

  // Use Math.round to avoid floating point issues
  return Math.round(dollars * CENTS_PER_DOLLAR);
};

/**
 * Convert a dollar string to cents
 * @param dollarString - Dollar amount as string (e.g., "12.50")
 * @returns Amount in cents
 */
export const dollarStringToCents = (dollarString: string): number => {
  const amount = parseFloat(dollarString);

  if (!isFinite(amount)) {
    return NaN;
  }

  return Math.round(amount * CENTS_PER_DOLLAR);
};

// ============================================================================
// Cents to Dollar Conversions
// ============================================================================

/**
 * Convert cents to dollars with rounding and optional symbol
 * @param cents - Amount in cents
 * @param roundPosition - Number of decimal places (default: 2)
 * @param symbol - Currency symbol (default: "$")
 * @param appendSymbol - Whether to include the currency symbol (default: true)
 * @returns Formatted dollar string
 */
export const centsToDollarsWithRounding = (
  cents: number | string | null | undefined,
  roundPosition: number = DEFAULT_DECIMAL_PLACES,
  symbol: string = DEFAULT_CURRENCY_SYMBOL,
  appendSymbol = true,
): string => {
  // Handle "N/A" string input
  if (cents === DEFAULT_FALLBACK) {
    return DEFAULT_FALLBACK;
  }

  // Handle nil values
  if (isNil(cents)) {
    return DEFAULT_FALLBACK;
  }

  const numericCents = Number(cents);

  // Handle zero explicitly (0 is a valid meaningful value)
  if (numericCents === 0) {
    const formattedZero = (0).toFixed(roundPosition);
    return appendSymbol ? `${symbol}${formattedZero}` : formattedZero;
  }

  // Handle NaN
  if (!isFinite(numericCents)) {
    return DEFAULT_FALLBACK;
  }

  // Determine sign and prefix
  const isNegative = numericCents < 0;
  const absValue = Math.abs(numericCents);
  const prefix = isNegative ? `-${symbol}` : symbol;

  // Calculate decimal places
  const decimalPlaces =
    isInteger(roundPosition) && roundPosition >= 0 ? roundPosition : DEFAULT_DECIMAL_PLACES;

  // Convert cents to dollars and format
  const dollarAmount = (absValue / CENTS_PER_DOLLAR).toFixed(decimalPlaces);
  const formattedAmount = addCommas(dollarAmount);

  return appendSymbol ? `${prefix}${formattedAmount}` : formattedAmount;
};

/**
 * Convert cents to dollars without rounding (preserves precision)
 * @param cents - Amount in cents (can be fractional for micro-cents)
 * @param roundPosition - Number of decimal places (default: 2)
 * @param symbol - Currency symbol (optional)
 * @param preserveNegativeRounding - Whether to preserve extra precision for small values
 * @returns Formatted dollar string
 */
export const centsToDollarsWithoutRounding = (
  cents: number | string | null | undefined,
  roundPosition: number = DEFAULT_DECIMAL_PLACES,
  symbol?: string,
  preserveNegativeRounding = false,
): string => {
  // Handle "N/A" string input
  if (cents === DEFAULT_FALLBACK) {
    return DEFAULT_FALLBACK;
  }

  // Handle nil values
  if (isNil(cents)) {
    return DEFAULT_FALLBACK;
  }

  const numericCents = Number(cents);

  // Handle NaN
  if (!isFinite(numericCents)) {
    return DEFAULT_FALLBACK;
  }

  let amount: number | string;

  if (preserveNegativeRounding && numericCents < 1) {
    // For micro-cent values, preserve more precision
    amount = (numericCents / 10000) * 100;
  } else {
    const correctedRoundPosition =
      isInteger(roundPosition) && roundPosition >= 0 ? roundPosition : DEFAULT_DECIMAL_PLACES;
    amount = ((numericCents / 10000) * 100).toFixed(correctedRoundPosition);
  }

  const formattedText = addCommas(amount);

  if (symbol) {
    return `${symbol} ${formattedText}`;
  }

  return formattedText;
};

// ============================================================================
// Percentage & Value Conversions
// ============================================================================

/**
 * Convert a value to percentage relative to a total
 * @param current - Current value
 * @param total - Total value
 * @param decimals - Number of decimal places (default: 2)
 * @returns Percentage string or "N/A"
 */
export const valueToPercent = (
  current: number | null | undefined,
  total: number | null | undefined,
  decimals = 2,
): string => {
  if (isNil(current) || isNil(total)) {
    return DEFAULT_FALLBACK;
  }

  if (total === 0) {
    return '0';
  }

  const percent = ((current / total) * 100).toFixed(decimals);
  return percent;
};

// ============================================================================
// Intl.NumberFormat Based Formatters (Modern API)
// ============================================================================

/**
 * Format a number as currency using Intl.NumberFormat
 * @param amount - Amount to format
 * @param currency - ISO 4217 currency code (default: "USD")
 * @param locale - Locale string (default: undefined for browser default)
 * @param options - Additional Intl.NumberFormatOptions
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
  locale?: string,
  options?: Partial<Intl.NumberFormatOptions>,
): string => {
  if (isNil(amount) || !isFinite(amount)) {
    return DEFAULT_FALLBACK;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      ...options,
    }).format(amount);
  } catch {
    return DEFAULT_FALLBACK;
  }
};

/**
 * Format cents as currency using Intl.NumberFormat
 * @param cents - Amount in cents
 * @param currency - ISO 4217 currency code (default: "USD")
 * @param locale - Locale string (default: undefined for browser default)
 * @returns Formatted currency string
 */
export const formatCentsAsCurrency = (
  cents: number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
  locale?: string,
): string => {
  if (isNil(cents) || !isFinite(cents)) {
    return DEFAULT_FALLBACK;
  }

  const dollars = cents / CENTS_PER_DOLLAR;
  return formatCurrency(dollars, currency, locale);
};

/**
 * Format a number as compact currency (e.g., $1.2K, $3.5M)
 * @param amount - Amount to format
 * @param currency - ISO 4217 currency code (default: "USD")
 * @param locale - Locale string (default: undefined for browser default)
 * @returns Formatted compact currency string
 */
export const formatCompactCurrency = (
  amount: number | null | undefined,
  currency: string = DEFAULT_CURRENCY,
  locale?: string,
): string => {
  if (isNil(amount) || !isFinite(amount)) {
    return DEFAULT_FALLBACK;
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(amount);
  } catch {
    return DEFAULT_FALLBACK;
  }
};

// ============================================================================
// Currency Parsing
// ============================================================================

/**
 * Parse a currency string to a number
 * Handles various formats: "$1,234.56", "1234.56", "-$500", etc.
 * @param currencyString - The currency string to parse
 * @returns Parsed number or NaN if invalid
 */
export const parseCurrencyString = (currencyString: string | null | undefined): number => {
  if (isNil(currencyString) || !isString(currencyString)) {
    return NaN;
  }

  // Remove currency symbols, spaces, and commas
  const cleaned = currencyString.replace(/[^0-9.-]/g, '').trim();

  const parsed = parseFloat(cleaned);

  // Handle negative amounts (check original for negative symbol at start)
  const isNegative =
    currencyString.trim().startsWith('-') ||
    (currencyString.includes('-') && !cleaned.startsWith('-'));

  if (isNegative && parsed > 0) {
    return -parsed;
  }

  return parsed;
};

/**
 * Parse a currency string to cents
 * @param currencyString - The currency string to parse
 * @returns Amount in cents or NaN if invalid
 */
export const parseCurrencyStringToCents = (currencyString: string | null | undefined): number => {
  const dollars = parseCurrencyString(currencyString);

  if (!isFinite(dollars)) {
    return NaN;
  }

  return Math.round(dollars * CENTS_PER_DOLLAR);
};

// ============================================================================
// Currency Validation
// ============================================================================

/**
 * Check if a value is a valid currency amount
 * @param value - Value to check
 * @returns True if valid currency amount
 */
export const isValidCurrencyAmount = (value: unknown): boolean => {
  if (isNumber(value)) {
    return isFinite(value);
  }

  if (isString(value)) {
    const parsed = parseCurrencyString(value);
    return isFinite(parsed);
  }

  return false;
};

// ============================================================================
// Currency Code Based Formatters (using currencySymbol data)
// ============================================================================

/**
 * Format cents to dollars using currency code for symbol lookup
 * @param cents - Amount in cents
 * @param currencyCode - ISO 4217 currency code (e.g., "USD", "EUR")
 * @param roundPosition - Number of decimal places (default: 2)
 * @param appendSymbol - Whether to include the currency symbol (default: true)
 * @returns Formatted currency string
 */
export const formatCentsByCurrencyCode = (
  cents: number | string | null | undefined,
  currencyCode: string = DEFAULT_CURRENCY,
  roundPosition: number = DEFAULT_DECIMAL_PLACES,
  appendSymbol = true,
): string => {
  const symbol = getCurrencySymbol(currencyCode, DEFAULT_CURRENCY_SYMBOL);
  return centsToDollarsWithRounding(cents, roundPosition, symbol, appendSymbol);
};

/**
 * Format a dollar amount using currency code for symbol lookup
 * @param amount - Amount in dollars
 * @param currencyCode - ISO 4217 currency code (e.g., "USD", "EUR")
 * @param roundPosition - Number of decimal places (default: 2)
 * @param appendSymbol - Whether to include the currency symbol (default: true)
 * @returns Formatted currency string
 */
export const formatAmountByCurrencyCode = (
  amount: number | null | undefined,
  currencyCode: string = DEFAULT_CURRENCY,
  roundPosition: number = DEFAULT_DECIMAL_PLACES,
  appendSymbol = true,
): string => {
  if (isNil(amount) || !isFinite(amount)) {
    return DEFAULT_FALLBACK;
  }

  const symbol = getCurrencySymbol(currencyCode, DEFAULT_CURRENCY_SYMBOL);
  const isNegative = amount < 0;
  const absValue = Math.abs(amount);
  const prefix = isNegative ? `-${symbol}` : symbol;

  const decimalPlaces =
    isInteger(roundPosition) && roundPosition >= 0 ? roundPosition : DEFAULT_DECIMAL_PLACES;

  const formattedAmount = addCommas(absValue.toFixed(decimalPlaces));

  return appendSymbol ? `${prefix}${formattedAmount}` : formattedAmount;
};

/**
 * Get a formatted currency display string with symbol and code
 * @param amount - Amount to format
 * @param currencyCode - ISO 4217 currency code
 * @param options - Formatting options
 * @returns Formatted string like "$1,234.56 USD" or "€500.00 EUR"
 */
export const formatCurrencyWithCode = (
  amount: number | null | undefined,
  currencyCode: string = DEFAULT_CURRENCY,
  options?: {
    decimals?: number;
    showCode?: boolean;
    showName?: boolean;
  },
): string => {
  const { decimals = 2, showCode = true, showName = false } = options ?? {};

  if (isNil(amount) || !isFinite(amount)) {
    return DEFAULT_FALLBACK;
  }

  const symbol = getCurrencySymbol(currencyCode, DEFAULT_CURRENCY_SYMBOL);
  const isNegative = amount < 0;
  const absValue = Math.abs(amount);
  const prefix = isNegative ? `-${symbol}` : symbol;
  const formattedAmount = addCommas(absValue.toFixed(decimals));

  let result = `${prefix}${formattedAmount}`;

  if (showCode) {
    result += ` ${currencyCode.toUpperCase()}`;
  }

  if (showName) {
    const name = getCurrencyName(currencyCode);
    if (name !== 'Unknown Currency') {
      result += ` (${name})`;
    }
  }

  return result;
};

// ============================================================================
// CurrencyFormatter Object (All-in-One)
// ============================================================================

// ============================================================================
// Re-export Currency Symbol Utilities
// ============================================================================

export {
  getCurrencySymbol,
  getCurrencyInfo,
  getCurrencyName,
  isValidCurrencyCode,
  getAllCurrencyCodes,
  searchCurrencies,
  type CurrencyInfo,
  type FormattedCurrency,
};

// ============================================================================
// CurrencyFormatter Object (All-in-One)
// ============================================================================

export const CurrencyFormatter = {
  // Helpers
  addCommas,

  // Dollar to cents
  dollarToCents,
  dollarStringToCents,

  // Cents to dollars
  centsToDollarsWithRounding,
  centsToDollarsWithoutRounding,

  // Percentage
  valueToPercent,

  // Modern Intl-based formatters
  formatCurrency,
  formatCentsAsCurrency,
  formatCompactCurrency,

  // Currency code based formatters
  formatCentsByCurrencyCode,
  formatAmountByCurrencyCode,
  formatCurrencyWithCode,

  // Parsing
  parseCurrencyString,
  parseCurrencyStringToCents,

  // Validation
  isValidCurrencyAmount,

  // Currency symbol lookup (from currencySymbol.ts)
  getCurrencySymbol,
  getCurrencyInfo,
  getCurrencyName,
  isValidCurrencyCode,
  getAllCurrencyCodes,
  searchCurrencies,

  // Constants
  DEFAULT_CURRENCY,
  DEFAULT_CURRENCY_SYMBOL,
  CENTS_PER_DOLLAR,
} as const;

export default CurrencyFormatter;
