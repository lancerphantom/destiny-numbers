'use client';

import { useState } from 'react';
import { Landing } from '@/components/Landing';
import { MoodSelector } from '@/components/MoodSelector';
import { QuoteCloud } from '@/components/QuoteCloud';
import { NumberReveal } from '@/components/NumberReveal';
import type { AppStage, MoodType, Quote } from '@/types';

export default function Home() {
  const [stage, setStage] = useState<AppStage>('landing');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setStage('quotes');
  };

  const handleQuoteSelect = (quote: Quote) => {
    setSelectedQuote(quote);
    setStage('reveal');
  };

  const handleRestart = () => {
    setStage('landing');
    setSelectedMood(null);
    setSelectedQuote(null);
  };

  return (
    <main>
      {stage === 'landing' && (
        <Landing onStart={() => setStage('mood')} />
      )}
      
      {stage === 'mood' && (
        <MoodSelector onSelectMood={handleMoodSelect} />
      )}

      {stage === 'quotes' && selectedMood && (
        <QuoteCloud mood={selectedMood} onSelectQuote={handleQuoteSelect} />
      )}

      {stage === 'reveal' && selectedQuote && (
        <NumberReveal quote={selectedQuote} onRestart={handleRestart} />
      )}
    </main>
  );
}