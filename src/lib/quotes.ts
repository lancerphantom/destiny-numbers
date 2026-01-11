/**
 * Mood definitions and quote collections for Destiny Numbers
 */

import { Mood, MoodType, Quote } from '@/types';

/**
 * Available moods with their display properties
 */
export const MOODS: Mood[] = [
  {
    type: 'happy',
    label: 'Happy',
    emoji: '😊',
    color: 'from-yellow-400 to-orange-400',
  },
  {
    type: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    color: 'from-purple-400 to-indigo-500',
  },
  {
    type: 'hopeful',
    label: 'Hopeful',
    emoji: '🌟',
    color: 'from-amber-300 to-yellow-400',
  },
  {
    type: 'melancholic',
    label: 'Melancholic',
    emoji: '🌧️',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    type: 'curious',
    label: 'Curious',
    emoji: '🤔',
    color: 'from-teal-400 to-cyan-400',
  },
  {
    type: 'peaceful',
    label: 'Peaceful',
    emoji: '🧘',
    color: 'from-green-400 to-emerald-400',
  },
  {
    type: 'determined',
    label: 'Determined',
    emoji: '💪',
    color: 'from-red-400 to-rose-500',
  },
  {
    type: 'lost',
    label: 'Lost',
    emoji: '🌫️',
    color: 'from-gray-400 to-slate-500',
  },
];

/**
 * Quote collections organized by mood
 */
export const QUOTES: Record<MoodType, Quote[]> = {
  happy: [
    { id: 'happy-1', text: 'Happiness is not something ready made. It comes from your own actions.', author: 'Dalai Lama', mood: 'happy' },
    { id: 'happy-2', text: 'The purpose of our lives is to be happy.', author: 'Dalai Lama', mood: 'happy' },
    { id: 'happy-3', text: 'Happiness is a warm puppy.', author: 'Charles M. Schulz', mood: 'happy' },
    { id: 'happy-4', text: 'The most important thing is to enjoy your life â€” to be happy.', author: 'Audrey Hepburn', mood: 'happy' },
    { id: 'happy-5', text: 'Happiness depends upon ourselves.', author: 'Aristotle', mood: 'happy' },
    { id: 'happy-6', text: 'Be happy for this moment. This moment is your life.', author: 'Omar Khayyam', mood: 'happy' },
    { id: 'happy-7', text: 'Joy is the simplest form of gratitude.', author: 'Karl Barth', mood: 'happy' },
    { id: 'happy-8', text: 'The sun himself is weak when he first rises.', author: 'Charles Dickens', mood: 'happy' },
    { id: 'happy-9', text: 'Let your joy be in your journey.', mood: 'happy' },
    { id: 'happy-10', text: 'Today is a good day to have a good day.', mood: 'happy' },
  ],

  anxious: [
    { id: 'anxious-1', text: 'This too shall pass.', mood: 'anxious' },
    { id: 'anxious-2', text: 'You don\'t have to control your thoughts. You just have to stop letting them control you.', author: 'Dan Millman', mood: 'anxious' },
    { id: 'anxious-3', text: 'Breathe. It\'s just a bad day, not a bad life.', mood: 'anxious' },
    { id: 'anxious-4', text: 'Anxiety is a thin stream of fear trickling through the mind.', author: 'Arthur Somers Roche', mood: 'anxious' },
    { id: 'anxious-5', text: 'Nothing diminishes anxiety faster than action.', author: 'Walter Anderson', mood: 'anxious' },
    { id: 'anxious-6', text: 'You are stronger than your anxiety.', mood: 'anxious' },
    { id: 'anxious-7', text: 'The greatest weapon against stress is our ability to choose one thought over another.', author: 'William James', mood: 'anxious' },
    { id: 'anxious-8', text: 'Worry often gives a small thing a big shadow.', author: 'Swedish Proverb', mood: 'anxious' },
    { id: 'anxious-9', text: 'You have survived every bad day so far.', mood: 'anxious' },
    { id: 'anxious-10', text: 'Take it one day at a time.', mood: 'anxious' },
  ],

  hopeful: [
    { id: 'hopeful-1', text: 'It always seems impossible until it is done.', author: 'Nelson Mandela', mood: 'hopeful' },
    { id: 'hopeful-2', text: 'The best is yet to come.', mood: 'hopeful' },
    { id: 'hopeful-3', text: 'Every sunset brings the promise of a new dawn.', author: 'Ralph Waldo Emerson', mood: 'hopeful' },
    { id: 'hopeful-4', text: 'Hope is being able to see that there is light despite all of the darkness.', author: 'Desmond Tutu', mood: 'hopeful' },
    { id: 'hopeful-5', text: 'Where there is hope, there is life.', author: 'Anne Frank', mood: 'hopeful' },
    { id: 'hopeful-6', text: 'Hope is the thing with feathers that perches in the soul.', author: 'Emily Dickinson', mood: 'hopeful' },
    { id: 'hopeful-7', text: 'Tomorrow is always fresh, with no mistakes in it yet.', author: 'L.M. Montgomery', mood: 'hopeful' },
    { id: 'hopeful-8', text: 'Every day is a new beginning. Take a deep breath and start again.', mood: 'hopeful' },
    { id: 'hopeful-9', text: 'The darkest hour has only sixty minutes.', author: 'Morris Mandel', mood: 'hopeful' },
    { id: 'hopeful-10', text: 'Stars can\'t shine without darkness.', mood: 'hopeful' },
  ],

  melancholic: [
    { id: 'melancholic-1', text: 'The wound is the place where the Light enters you.', author: 'Rumi', mood: 'melancholic' },
    { id: 'melancholic-2', text: 'Even the darkest night will end and the sun will rise.', author: 'Victor Hugo', mood: 'melancholic' },
    { id: 'melancholic-3', text: 'Tears are words that need to be written.', author: 'Paulo Coelho', mood: 'melancholic' },
    { id: 'melancholic-4', text: 'Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.', author: 'Christopher Morley', mood: 'melancholic' },
    { id: 'melancholic-5', text: 'There is no greater sorrow than to recall happiness in times of misery.', author: 'Dante', mood: 'melancholic' },
    { id: 'melancholic-6', text: 'Behind every exquisite thing that existed, there was something tragic.', author: 'Oscar Wilde', mood: 'melancholic' },
    { id: 'melancholic-7', text: 'The soul would have no rainbow if the eyes had no tears.', author: 'Native American Proverb', mood: 'melancholic' },
    { id: 'melancholic-8', text: 'Sadness flies away on the wings of time.', author: 'Jean de La Fontaine', mood: 'melancholic' },
    { id: 'melancholic-9', text: 'In the depth of winter, I finally learned that within me there lay an invincible summer.', author: 'Albert Camus', mood: 'melancholic' },
    { id: 'melancholic-10', text: 'Every heart has its secret sorrows which the world knows not.', author: 'Henry Wadsworth Longfellow', mood: 'melancholic' },
  ],

  curious: [
    { id: 'curious-1', text: 'The important thing is not to stop questioning.', author: 'Albert Einstein', mood: 'curious' },
    { id: 'curious-2', text: 'Curiosity is the wick in the candle of learning.', author: 'William Arthur Ward', mood: 'curious' },
    { id: 'curious-3', text: 'The mind that opens to a new idea never returns to its original size.', author: 'Albert Einstein', mood: 'curious' },
    { id: 'curious-4', text: 'I have no special talents. I am only passionately curious.', author: 'Albert Einstein', mood: 'curious' },
    { id: 'curious-5', text: 'Wonder is the beginning of wisdom.', author: 'Socrates', mood: 'curious' },
    { id: 'curious-6', text: 'Be curious, not judgmental.', author: 'Walt Whitman', mood: 'curious' },
    { id: 'curious-7', text: 'The cure for boredom is curiosity. There is no cure for curiosity.', author: 'Dorothy Parker', mood: 'curious' },
    { id: 'curious-8', text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi', mood: 'curious' },
    { id: 'curious-9', text: 'The more I learn, the more I realize how much I don\'t know.', author: 'Albert Einstein', mood: 'curious' },
    { id: 'curious-10', text: 'Millions saw the apple fall, but Newton asked why.', author: 'Bernard Baruch', mood: 'curious' },
  ],

  peaceful: [
    { id: 'peaceful-1', text: 'Peace comes from within. Do not seek it without.', author: 'Buddha', mood: 'peaceful' },
    { id: 'peaceful-2', text: 'In the midst of movement and chaos, keep stillness inside of you.', author: 'Deepak Chopra', mood: 'peaceful' },
    { id: 'peaceful-3', text: 'Nothing can bring you peace but yourself.', author: 'Ralph Waldo Emerson', mood: 'peaceful' },
    { id: 'peaceful-4', text: 'Serenity is not freedom from the storm, but peace amid the storm.', mood: 'peaceful' },
    { id: 'peaceful-5', text: 'The life of inner peace is the easiest kind of life.', author: 'Norman Vincent Peale', mood: 'peaceful' },
    { id: 'peaceful-6', text: 'Be still like a mountain and flow like a great river.', author: 'Lao Tzu', mood: 'peaceful' },
    { id: 'peaceful-7', text: 'Calm mind brings inner strength and self-confidence.', author: 'Dalai Lama', mood: 'peaceful' },
    { id: 'peaceful-8', text: 'Within you, there is a stillness and a sanctuary.', author: 'Hermann Hesse', mood: 'peaceful' },
    { id: 'peaceful-9', text: 'Let go of the thoughts that don\'t make you strong.', mood: 'peaceful' },
    { id: 'peaceful-10', text: 'Silence is a source of great strength.', author: 'Lao Tzu', mood: 'peaceful' },
  ],

  determined: [
    { id: 'determined-1', text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius', mood: 'determined' },
    { id: 'determined-2', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', mood: 'determined' },
    { id: 'determined-3', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill', mood: 'determined' },
    { id: 'determined-4', text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt', mood: 'determined' },
    { id: 'determined-5', text: 'The harder the conflict, the more glorious the triumph.', author: 'Thomas Paine', mood: 'determined' },
    { id: 'determined-6', text: 'Fall seven times, stand up eight.', author: 'Japanese Proverb', mood: 'determined' },
    { id: 'determined-7', text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', author: 'Ralph Waldo Emerson', mood: 'determined' },
    { id: 'determined-8', text: 'Strength does not come from physical capacity. It comes from an indomitable will.', author: 'Mahatma Gandhi', mood: 'determined' },
    { id: 'determined-9', text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt', mood: 'determined' },
    { id: 'determined-10', text: 'You are never too old to set another goal or to dream a new dream.', author: 'C.S. Lewis', mood: 'determined' },
  ],

  lost: [
    { id: 'lost-1', text: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien', mood: 'lost' },
    { id: 'lost-2', text: 'The only way out is through.', author: 'Robert Frost', mood: 'lost' },
    { id: 'lost-3', text: 'Sometimes you find yourself in the middle of nowhere, and sometimes, in the middle of nowhere, you find yourself.', mood: 'lost' },
    { id: 'lost-4', text: 'When you don\'t know where you\'re going, any road will take you there.', author: 'Lewis Carroll', mood: 'lost' },
    { id: 'lost-5', text: 'Feeling lost? Take a breath. You are exactly where you need to be.', mood: 'lost' },
    { id: 'lost-6', text: 'It\'s okay to not know. The answers will come when you least expect them.', mood: 'lost' },
    { id: 'lost-7', text: 'The path will reveal itself. Trust the journey.', mood: 'lost' },
    { id: 'lost-8', text: 'Sometimes the wrong choices bring us to the right places.', mood: 'lost' },
    { id: 'lost-9', text: 'Getting lost is just another way of saying going exploring.', author: 'Justina Chen', mood: 'lost' },
    { id: 'lost-10', text: 'You can\'t start the next chapter if you keep re-reading the last one.', mood: 'lost' },
  ],
};

/**
 * Get quotes for a specific mood
 */
export function getQuotesForMood(mood: MoodType): Quote[] {
  return QUOTES[mood] || [];
}

/**
 * Get a random selection of quotes for a mood
 */
export function getRandomQuotes(mood: MoodType, count: number = 10): Quote[] {
  const allQuotes = [...QUOTES[mood]];
  const shuffled = allQuotes.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Find a mood by its type
 */
export function getMoodByType(type: MoodType): Mood | undefined {
  return MOODS.find(m => m.type === type);
}