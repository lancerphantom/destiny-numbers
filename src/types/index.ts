/**
 * Type definitions for Destiny Numbers app
 */

/**
 * Available mood types
 */
export type MoodType =
  | 'happy'
  | 'anxious'
  | 'hopeful'
  | 'melancholic'
  | 'curious'
  | 'peaceful'
  | 'determined'
  | 'lost';

/**
 * Mood definition with display properties
 */
export interface Mood {
  type: MoodType;
  label: string;
  emoji: string;
  /** Tailwind gradient classes */
  color: string;
}

/**
 * A quote with optional attribution
 */
export interface Quote {
  id: string;
  text: string;
  author?: string;
  mood: MoodType;
}

/**
 * Day scenario types
 */
export type DayScenario = 'A' | 'B' | 'C' | 'SUNDAY';

/**
 * Result from destiny number generation
 */
export interface DestinyResult {
  pool1: number[] | null;
  pool2: number[] | null;
  scenario: DayScenario;
  day: string;
  isRestDay: boolean;
  quote: Quote;
  timestamp: Date;
}

/**
 * App stages/screens
 */
export type AppStage = 'landing' | 'mood' | 'quotes' | 'reveal';

/**
 * App state for the destiny flow
 */
export interface DestinyState {
  stage: AppStage;
  selectedMood: MoodType | null;
  selectedQuote: Quote | null;
  result: DestinyResult | null;
}

/**
 * API request for number generation
 */
export interface GenerateRequest {
  quote: string;
}

/**
 * API response from number generation
 */
export interface GenerateResponse {
  pool1: number[] | null;
  pool2: number[] | null;
  scenario: DayScenario;
  day: string;
  isRestDay: boolean;
  timestamp: string;
  quote: string;
}