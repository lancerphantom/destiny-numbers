/**
 * Destiny Numbers – Core Generation Logic
 *
 * The numbers are deterministic: same quote + same day = same numbers.
 * This creates the feeling of "destined" numbers.
 *
 * Different scenarios for different days:
 * - Monday & Thursday: Scenario A (5 nums 1-47, 1 num 1-10)
 * - Tuesday & Friday: Scenario B (5 nums 1-50, 2 nums 1-12)
 * - Wednesday & Saturday: Scenario C (5 nums 1-39, 1 num 1-14)
 * - Sunday: Rest day (no numbers)
 */

export type DayScenario = 'A' | 'B' | 'C' | 'SUNDAY';

export interface DestinyNumbers {
  pool1: number[] | null;
  pool2: number[] | null;
  scenario: DayScenario;
  day: string;
  isRestDay: boolean;
}

/**
 * Convert a quote into a numeric value by summing character codes.
 */
export function calculateQuoteValue(quoteText: string): number {
  const cleaned = quoteText.replace(/\s/g, '');
  let total = 0;

  for (const char of cleaned) {
    total += char.charCodeAt(0);
  }

  return total;
}

/**
 * Get current time as a numeric value (down to day precision).
 * Format: YYYYMMDD
 */
export function getTimeValue(): number {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const timeString = `${year}${month}${day}`;
  return parseInt(timeString, 10);
}

/**
 * Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
 */
export function getDayOfWeek(): number {
  return new Date().getDay();
}

/**
 * Get day name from day number
 */
export function getDayName(dayNum: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNum];
}

/**
 * Determine which scenario to use based on day of week
 */
export function getScenarioForDay(dayNum: number): DayScenario {
  switch (dayNum) {
    case 0: return 'SUNDAY';  // Sunday - rest day
    case 1: return 'A';       // Monday
    case 2: return 'B';       // Tuesday
    case 3: return 'C';       // Wednesday
    case 4: return 'A';       // Thursday
    case 5: return 'B';       // Friday
    case 6: return 'C';       // Saturday
    default: return 'A';
  }
}

/**
 * Simple seeded random number generator (Mulberry32)
 * Provides deterministic pseudo-random numbers from a seed.
 */
function seededRandom(seed: number): () => number {
  return function() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

/**
 * Generate unique random numbers from a given range
 */
function generateUniqueNumbers(random: () => number, min: number, max: number, count: number): number[] {
  const numbers: number[] = [];

  while (numbers.length < count) {
    const number = Math.floor(random() * (max - min + 1)) + min;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers.sort((a, b) => a - b);
}

/**
 * Scenario A: Pool1: 5 numbers (1-47), Pool2: 1 number (1-10)
 */
function generateScenarioA(random: () => number): { pool1: number[], pool2: number[] } {
  const pool1 = generateUniqueNumbers(random, 1, 47, 5);
  const pool2 = [Math.floor(random() * 10) + 1];

  return { pool1, pool2 };
}

/**
 * Scenario B: Pool1: 5 numbers (1-50), Pool2: 2 unique numbers (1-12)
 */
function generateScenarioB(random: () => number): { pool1: number[], pool2: number[] } {
  const pool1 = generateUniqueNumbers(random, 1, 50, 5);
  const pool2 = generateUniqueNumbers(random, 1, 12, 2);

  return { pool1, pool2 };
}

/**
 * Scenario C: Pool1: 5 numbers (1-39), Pool2: 1 number (1-14)
 */
function generateScenarioC(random: () => number): { pool1: number[], pool2: number[] } {
  const pool1 = generateUniqueNumbers(random, 1, 39, 5);
  const pool2 = [Math.floor(random() * 14) + 1];

  return { pool1, pool2 };
}

/**
 * Main function: takes a quote and returns destiny numbers based on the day
 */
export function getDestinyNumbers(quoteText: string): DestinyNumbers {
  const dayNum = getDayOfWeek();
  const scenario = getScenarioForDay(dayNum);
  const dayName = getDayName(dayNum);

  // Sunday - rest day
  if (scenario === 'SUNDAY') {
    return {
      pool1: null,
      pool2: null,
      scenario: 'SUNDAY',
      day: dayName,
      isRestDay: true,
    };
  }

  // Generate seed using safer combination to avoid overflow
  const quoteValue = calculateQuoteValue(quoteText);
  const timeValue = getTimeValue();
  const seed = (quoteValue ^ timeValue) + dayNum;  // XOR + day for variation

  const random = seededRandom(seed);

  let pool1: number[];
  let pool2: number[];

  // Generate numbers based on scenario
  switch (scenario) {
    case 'A':
      ({ pool1, pool2 } = generateScenarioA(random));
      break;
    case 'B':
      ({ pool1, pool2 } = generateScenarioB(random));
      break;
    case 'C':
      ({ pool1, pool2 } = generateScenarioC(random));
      break;
    default:
      ({ pool1, pool2 } = generateScenarioA(random));
  }

  return {
    pool1,
    pool2,
    scenario,
    day: dayName,
    isRestDay: false,
  };
}

/**
 * Get full destiny result with metadata.
 */
export interface DestinyResult {
  pool1: number[] | null;
  pool2: number[] | null;
  scenario: DayScenario;
  day: string;
  isRestDay: boolean;
  quoteValue: number;
  timeValue: number;
  seed: number;
  timestamp: Date;
}

export function getDestinyResult(quoteText: string): DestinyResult {
  const dayNum = getDayOfWeek();
  const scenario = getScenarioForDay(dayNum);
  const dayName = getDayName(dayNum);

  if (scenario === 'SUNDAY') {
    return {
      pool1: null,
      pool2: null,
      scenario: 'SUNDAY',
      day: dayName,
      isRestDay: true,
      quoteValue: 0,
      timeValue: 0,
      seed: 0,
      timestamp: new Date(),
    };
  }

  const quoteValue = calculateQuoteValue(quoteText);
  const timeValue = getTimeValue();
  const seed = (quoteValue ^ timeValue) + dayNum;
  const numbers = getDestinyNumbers(quoteText);

  return {
    ...numbers,
    quoteValue,
    timeValue,
    seed,
    timestamp: new Date(),
  };
}
