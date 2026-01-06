/**
 * Destiny Numbers â€” Core Generation Logic
 * 
 * The numbers are deterministic: same quote + same minute = same numbers.
 * This creates the feeling of "destined" numbers.
 */

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
 * Get current time as a numeric value (down to minute precision).
 * Format: YYYYMMDDHHmm
 */
export function getTimeValue(): number {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const timeString = `${year}${month}${day}${hours}${minutes}`;
  return parseInt(timeString, 10);
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
 * Generate unique random numbers between 1-100 using the given seed.
 */
export function generateDestinyNumbers(seed: number, count: number = 8): number[] {
  const random = seededRandom(seed);
  const numbers: number[] = [];
  
  while (numbers.length < count) {
    const number = Math.floor(random() * 100) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  
  return numbers.sort((a, b) => a - b);
}

/**
 * Main function: takes a quote and returns 8 destiny numbers.
 */
export function getDestinyNumbers(quoteText: string): number[] {
  const quoteValue = calculateQuoteValue(quoteText);
  const timeValue = getTimeValue();
  const seed = quoteValue * timeValue;
  
  return generateDestinyNumbers(seed);
}

/**
 * Get full destiny result with metadata.
 */
export interface DestinyResult {
  numbers: number[];
  quoteValue: number;
  timeValue: number;
  seed: number;
  timestamp: Date;
}

export function getDestinyResult(quoteText: string): DestinyResult {
  const quoteValue = calculateQuoteValue(quoteText);
  const timeValue = getTimeValue();
  const seed = quoteValue * timeValue;
  const numbers = generateDestinyNumbers(seed);
  
  return {
    numbers,
    quoteValue,
    timeValue,
    seed,
    timestamp: new Date(),
  };
}