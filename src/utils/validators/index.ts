/* eslint-disable @typescript-eslint/no-unnecessary-type-parameters */
/**
 * Common Validators using lodash-es
 * A comprehensive collection of validation utilities for forms and data validation
 */
import {
  isEmpty,
  isNil,
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isPlainObject,
  isDate,
  isFunction,
  isFinite,
  isInteger,
  isNaN,
  trim,
  inRange,
  has,
  every,
  some,
} from 'lodash-es';

// ============================================================================
// Type Guards & Basic Validators
// ============================================================================

/**
 * Check if value is null or undefined
 */
export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return isNil(value);
};

/**
 * Check if value exists (not null, undefined, or empty)
 */
export const exists = (value: unknown): boolean => {
  return !isNil(value) && !isEmpty(value);
};

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export const isEmptyValue = (value: unknown): boolean => {
  if (isNil(value)) {
    return true;
  }
  if (isString(value)) {
    return trim(value) === '';
  }
  if (isArray(value) || isPlainObject(value)) {
    return isEmpty(value);
  }
  return false;
};

/**
 * Check if value is a non-empty string
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return isString(value) && trim(value).length > 0;
};

/**
 * Check if value is a valid number (finite and not NaN)
 */
export const isValidNumber = (value: unknown): value is number => {
  return isNumber(value) && isFinite(value) && !isNaN(value);
};

// ============================================================================
// String Validators
// ============================================================================

/**
 * Email validation regex pattern
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Check if value is a valid email address
 */
export const isValidEmail = (value: unknown): boolean => {
  if (!isString(value)) {
    return false;
  }
  const trimmed = trim(value);
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
};

/**
 * Phone number validation (international format)
 */
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

/**
 * Check if value is a valid phone number (E.164 format)
 */
export const isValidPhone = (value: unknown): boolean => {
  if (!isString(value)) {
    return false;
  }
  const cleaned = value.replace(/[\s\-().]/g, '');
  return PHONE_REGEX.test(cleaned);
};

/**
 * URL validation regex
 */
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?[^\s]*)?$/i;

/**
 * Check if value is a valid URL
 */
export const isValidUrl = (value: unknown): boolean => {
  if (!isString(value)) {
    return false;
  }
  try {
    new URL(value);
    return true;
  } catch {
    return URL_REGEX.test(trim(value));
  }
};

/**
 * UUID validation regex (v4)
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Check if value is a valid UUID (v4)
 */
export const isValidUUID = (value: unknown): boolean => {
  return isString(value) && UUID_REGEX.test(value);
};

/**
 * Check if string contains only alphanumeric characters
 */
export const isAlphanumeric = (value: unknown): boolean => {
  return isString(value) && /^[a-zA-Z0-9]+$/.test(value);
};

/**
 * Check if string contains only letters
 */
export const isAlpha = (value: unknown): boolean => {
  return isString(value) && /^[a-zA-Z]+$/.test(value);
};

/**
 * Check if string matches a pattern
 */
export const matchesPattern = (value: unknown, pattern: RegExp): boolean => {
  return isString(value) && pattern.test(value);
};

// ============================================================================
// Length & Range Validators
// ============================================================================

/**
 * Check if string length is within range
 */
export const hasLengthBetween = (value: unknown, min: number, max: number): boolean => {
  if (!isString(value)) {
    return false;
  }
  const len = trim(value).length;
  return len >= min && len <= max;
};

/**
 * Check if string has minimum length
 */
export const hasMinLength = (value: unknown, min: number): boolean => {
  if (!isString(value)) {
    return false;
  }
  return trim(value).length >= min;
};

/**
 * Check if string has maximum length
 */
export const hasMaxLength = (value: unknown, max: number): boolean => {
  if (!isString(value)) {
    return false;
  }
  return trim(value).length <= max;
};

/**
 * Check if string has exact length
 */
export const hasExactLength = (value: unknown, length: number): boolean => {
  if (!isString(value)) {
    return false;
  }
  return trim(value).length === length;
};

/**
 * Check if number is within range (inclusive)
 */
export const isInRange = (value: unknown, min: number, max: number): boolean => {
  return isValidNumber(value) && inRange(value, min, max + 1);
};

/**
 * Check if number is greater than minimum
 */
export const isGreaterThan = (value: unknown, min: number): boolean => {
  return isValidNumber(value) && value > min;
};

/**
 * Check if number is less than maximum
 */
export const isLessThan = (value: unknown, max: number): boolean => {
  return isValidNumber(value) && value < max;
};

/**
 * Check if number is greater than or equal to minimum
 */
export const isGreaterThanOrEqual = (value: unknown, min: number): boolean => {
  return isValidNumber(value) && value >= min;
};

/**
 * Check if number is less than or equal to maximum
 */
export const isLessThanOrEqual = (value: unknown, max: number): boolean => {
  return isValidNumber(value) && value <= max;
};

// ============================================================================
// Array Validators
// ============================================================================

/**
 * Check if value is a non-empty array
 */
export const isNonEmptyArray = (value: unknown): value is unknown[] => {
  return isArray(value) && value.length > 0;
};

/**
 * Check if array has minimum length
 */
export const hasMinItems = (value: unknown, min: number): boolean => {
  return isArray(value) && value.length >= min;
};

/**
 * Check if array has maximum length
 */
export const hasMaxItems = (value: unknown, max: number): boolean => {
  return isArray(value) && value.length <= max;
};

/**
 * Check if array contains a specific value
 */
export const arrayContains = <T>(value: unknown, item: T): boolean => {
  return isArray(value) && value.includes(item);
};

/**
 * Check if all items in array satisfy a condition
 */
export const allItemsSatisfy = <T>(value: unknown, predicate: (item: T) => boolean): boolean => {
  return isArray(value) && every(value as T[], predicate);
};

/**
 * Check if some items in array satisfy a condition
 */
export const someItemsSatisfy = <T>(value: unknown, predicate: (item: T) => boolean): boolean => {
  return isArray(value) && some(value as T[], predicate);
};

// ============================================================================
// Object Validators
// ============================================================================

/**
 * Check if value is a non-empty object
 */
export const isNonEmptyObject = (value: unknown): value is Record<string, unknown> => {
  return isPlainObject(value) && !isEmpty(value);
};

/**
 * Check if object has a specific property
 */
export const hasProperty = (value: unknown, path: string): boolean => {
  return isObject(value) && has(value, path);
};

/**
 * Check if object has all required properties
 */
export const hasRequiredProperties = (value: unknown, properties: string[]): boolean => {
  if (!isPlainObject(value)) {
    return false;
  }
  return properties.every(prop => has(value, prop));
};

// ============================================================================
// Utility Exports
// ============================================================================

/**
 * Validator object containing all validation functions
 */
export const Validator = {
  // Type guards
  isNullOrUndefined,
  exists,
  isEmptyValue,
  isNonEmptyString,
  isValidNumber,

  // String validators
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isValidUUID,
  isAlphanumeric,
  isAlpha,
  matchesPattern,

  // Length & Range
  hasLengthBetween,
  hasMinLength,
  hasMaxLength,
  hasExactLength,
  isInRange,
  isGreaterThan,
  isLessThan,
  isGreaterThanOrEqual,
  isLessThanOrEqual,

  // Array validators
  isNonEmptyArray,
  hasMinItems,
  hasMaxItems,
  arrayContains,
  allItemsSatisfy,

  // Object validators
  isNonEmptyObject,
  hasProperty,
  hasRequiredProperties,

  // Re-export lodash type checks
  isString,
  isNumber,
  isBoolean,
  isArray,
  isObject,
  isPlainObject,
  isDate,
  isFunction,
  isFinite,
  isInteger,
  isNaN,
  isEmpty,
  isNil,
} as const;

export default Validator;
