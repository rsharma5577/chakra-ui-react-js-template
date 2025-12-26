/**
 * Date Formatters and Converters using date-fns
 * Minimal set of date utilities based on existing Converter class
 */
import {
  format,
  parse,
  isValid,
  addDays,
  addMonths,
  addYears,
  startOfMonth,
  startOfYear,
  getDay,
} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
const DEFAULT_TIME_FORMAT = 'HH:mm:ss';
const DEFAULT_FALLBACK = 'N/A';

// ============================================================================
// Time Conversion Functions
// ============================================================================

/**
 * Convert milliseconds to hours
 */
export const millisecondsToHours = (millisec: number): number => {
  const hours = millisec / (1000 * 60 * 60);
  return parseFloat(hours.toFixed(1));
};

/**
 * Convert seconds to minutes
 */
export const secondsToMins = (seconds: number): number => {
  return Math.floor(seconds / 60);
};

/**
 * Convert minutes to seconds
 */
export const minsToSeconds = (mins: number): number => {
  return mins * 60;
};

/**
 * Convert seconds to hours
 */
export const secondsToHours = (seconds: number): number => {
  const hours = seconds / (60 * 60);
  return parseFloat(hours.toFixed(1));
};

/**
 * Convert hours to seconds
 */
export const hoursToSeconds = (hours: number): number => {
  const seconds = hours * 60 * 60;
  return parseFloat(seconds.toFixed(1));
};

/**
 * Convert seconds to days
 */
export const secondsToDays = (seconds: number): number => {
  const days = seconds / (60 * 60 * 24);
  return parseFloat(days.toFixed(1));
};

/**
 * Convert seconds to specified unit
 */
export const secondsToUnit = (
  seconds: number,
  unit: 'second' | 'minute' | 'hour' | 'day',
): number => {
  switch (unit) {
    case 'day':
      return secondsToDays(seconds);
    case 'second':
      return seconds;
    case 'minute':
      return secondsToMins(seconds);
    case 'hour':
      return secondsToHours(seconds);
    default:
      return seconds;
  }
};

// ============================================================================
// UTC Date/Time Functions
// ============================================================================

/**
 * Convert seconds to formatted time string in UTC (HH:mm:ss)
 */
export const secondsToUtcFormattedTimeString = (
  seconds: number,
  formatString: string = DEFAULT_TIME_FORMAT,
): string => {
  if (seconds === 0) {
    return DEFAULT_FALLBACK;
  }

  try {
    const date = new Date(seconds * 1000);
    const timeString = formatInTimeZone(date, 'UTC', formatString);
    return timeString || DEFAULT_FALLBACK;
  } catch {
    return DEFAULT_FALLBACK;
  }
};

/**
 * Convert milliseconds to date time string (UTC)
 */
export const millisecToDateTimeStringUTC = (
  millisec: number,
  formatString: string = DEFAULT_DATETIME_FORMAT,
): string => {
  if (millisec === 0) {
    return DEFAULT_FALLBACK;
  }

  try {
    const date = new Date(millisec);
    const dateTimeString = formatInTimeZone(date, 'UTC', formatString);
    return dateTimeString || DEFAULT_FALLBACK;
  } catch {
    return DEFAULT_FALLBACK;
  }
};

/**
 * Convert date time string (UTC) to epoch milliseconds
 */
export const dateTimeStringUTCToEpochMillisec = (
  dateTimeString: string,
  formatString = 'yyyy-MM-dd HH:mm:ss:SSS',
): number | string => {
  if (!dateTimeString) {
    return DEFAULT_FALLBACK;
  }

  try {
    const date = parse(dateTimeString, formatString, new Date());
    if (!isValid(date)) {
      return DEFAULT_FALLBACK;
    }
    return date.getTime();
  } catch {
    return DEFAULT_FALLBACK;
  }
};

// ============================================================================
// Date Calculation Functions
// ============================================================================

/**
 * Get next occurrence of a specific day of week
 * @param day 0-6 (0 = Sunday, 6 = Saturday)
 */
export const getNextDay = (day: number): Date => {
  const date = new Date();
  const dateDay = getDay(date);

  if (dateDay < day) {
    return addDays(date, day - dateDay);
  }

  return addDays(date, 7 - Math.abs(day - dateDay));
};

/**
 * Get first day of the next month
 */
export const getFirstDayOfTheMonth = (dateObj: Date | string | number): Date => {
  const date = new Date(dateObj);
  return startOfMonth(addMonths(date, 1));
};

/**
 * Get first day of next year (January 1st)
 */
export const getFirstOfJanuary = (dateObj: Date | string | number): Date => {
  const date = new Date(dateObj);
  return startOfYear(addYears(date, 1));
};

// ============================================================================
// General Format Functions
// ============================================================================

/**
 * Format a date to string with fallback
 */
export const formatDate = (
  input: Date | string | number,
  formatString: string = DEFAULT_DATETIME_FORMAT,
  fallback: string = DEFAULT_FALLBACK,
): string => {
  if (Number(input) === 0) {
    return fallback;
  }

  try {
    const date = input instanceof Date ? input : new Date(input);
    if (!isValid(date)) {
      return fallback;
    }
    return format(date, formatString);
  } catch {
    return fallback;
  }
};

/**
 * Format a date in UTC timezone
 */
export const formatDateUTC = (
  input: Date | string | number,
  formatString: string = DEFAULT_DATETIME_FORMAT,
  fallback: string = DEFAULT_FALLBACK,
): string => {
  if (Number(input) === 0) {
    return fallback;
  }

  try {
    const date = input instanceof Date ? input : new Date(input);
    if (!isValid(date)) {
      return fallback;
    }
    return formatInTimeZone(date, 'UTC', formatString);
  } catch {
    return fallback;
  }
};

// ============================================================================
// DateFormatter Object (All-in-One)
// ============================================================================

export const DateFormatter = {
  // Time conversions
  millisecondsToHours,
  secondsToMins,
  minsToSeconds,
  secondsToHours,
  hoursToSeconds,
  secondsToDays,
  secondsToUnit,

  // UTC functions
  secondsToUtcFormattedTimeString,
  millisecToDateTimeStringUTC,
  dateTimeStringUTCToEpochMillisec,

  // Date calculations
  getNextDay,
  getFirstDayOfTheMonth,
  getFirstOfJanuary,

  // Format functions
  formatDate,
  formatDateUTC,
} as const;

export default DateFormatter;
