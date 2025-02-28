// Types for MonkeyType data
export interface MonkeyTypeWord {
  reason: "error" | "corrected";
  word: string;
}

export interface MonkeyTypeSession {
  id: number;
  time: string;
  words: MonkeyTypeWord[];
}

export interface WordData {
  sessionId: number;
  sessionTime: Date;
  word: string;
  reason: "error" | "corrected";
  wordLength: number;
  hasSpecialChars: boolean;
  hasNumbers: boolean;
  isUppercase: boolean;
  isCapitalized: boolean;
}

export interface SessionSummary {
  sessionId: number;
  timestamp: Date;
  totalWords: number;
  errors: number;
  corrected: number;
  errorRate: number;
}

export interface WordFrequency {
  word: string;
  frequency: number;
}

export interface LetterFrequency {
  letter: string;
  count: number;
}

export interface ErrorMetrics {
  overallErrorRate: number;
  shortWordsErrorRate: number;
  mediumWordsErrorRate: number;
  longWordsErrorRate: number;
  wordsWithSpecialCharsErrorRate: number;
  wordsWithNumbersErrorRate: number;
  uppercaseWordsErrorRate: number;
  capitalizedWordsErrorRate: number;
}

export interface Summary {
  totalWords: number;
  errorWords: number;
  correctedWords: number;
  errorRate: number;
  correctionRate: number;
  sessionCount: number;
  avgErrorWordLength: number;
  avgCorrectedWordLength: number;
  mostCommonErrorWord: string;
  sessionWithHighestErrorRate: string;
  sessionWithLowestErrorRate: string;
}

export interface Recommendation {
  category: string;
  items: string[];
}

export interface MonkeyTypeData {
  allWords: WordData[];
  sessionSummary: SessionSummary[];
  errorWords: WordData[];
  correctedWords: WordData[];
  errorWordFrequency: WordFrequency[];
  correctedWordFrequency: WordFrequency[];
  errorLetterFrequency: LetterFrequency[];
  correctedLetterFrequency: LetterFrequency[];
  metrics: ErrorMetrics;
  summary: Summary;
  recommendations: Recommendation[];
}

// Helper functions
function countLetters(wordList: string[]): Record<string, number> {
  const letterCounts: Record<string, number> = {};

  for (const word of wordList) {
    for (const letter of word) {
      if (letter.match(/[a-zA-Z]/)) {
        const lowerLetter = letter.toLowerCase();
        letterCounts[lowerLetter] = (letterCounts[lowerLetter] || 0) + 1;
      }
    }
  }

  return letterCounts;
}

function calculateErrorRateForCondition(
  words: WordData[],
  condition: (word: WordData) => boolean
): number {
  const filteredWords = words.filter(condition);
  if (filteredWords.length === 0) return 0;

  const errorWords = filteredWords.filter((word) => word.reason === "error");
  return (errorWords.length / filteredWords.length) * 100;
}

function getWordFrequency(words: WordData[]): WordFrequency[] {
  const wordCounts: Record<string, number> = {};

  for (const wordData of words) {
    wordCounts[wordData.word] = (wordCounts[wordData.word] || 0) + 1;
  }

  return Object.entries(wordCounts)
    .map(([word, frequency]) => ({ word, frequency }))
    .sort((a, b) => b.frequency - a.frequency);
}

function generateRecommendations(data: MonkeyTypeData): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const { metrics, errorWordFrequency, summary } = data;

  // Pattern-based recommendations
  const patternItems: string[] = [];

  if (summary.avgErrorWordLength > summary.avgCorrectedWordLength) {
    patternItems.push(
      `You tend to make more errors on longer words (average length: ${summary.avgErrorWordLength.toFixed(
        1
      )} characters).`
    );
  } else if (summary.avgErrorWordLength < summary.avgCorrectedWordLength) {
    patternItems.push(
      `You interestingly make more errors on shorter words (average length: ${summary.avgErrorWordLength.toFixed(
        1
      )} characters).`
    );
  } else {
    patternItems.push(
      `Word length doesn't seem to significantly impact your error rate.`
    );
  }

  if (metrics.shortWordsErrorRate > metrics.overallErrorRate) {
    patternItems.push(
      `High error rate (${metrics.shortWordsErrorRate.toFixed(
        1
      )}%) for short words under 4 characters.`
    );
  }

  if (metrics.longWordsErrorRate > metrics.overallErrorRate) {
    patternItems.push(
      `High error rate (${metrics.longWordsErrorRate.toFixed(
        1
      )}%) for long words over 6 characters.`
    );
  }

  if (metrics.wordsWithSpecialCharsErrorRate > metrics.overallErrorRate) {
    patternItems.push(
      `High error rate (${metrics.wordsWithSpecialCharsErrorRate.toFixed(
        1
      )}%) for words with special characters.`
    );
  }

  recommendations.push({
    category: "Error Patterns",
    items: patternItems,
  });

  // Focused practice recommendations
  const practiceItems: string[] = [];

  if (errorWordFrequency.length > 0) {
    const topErrorWords = errorWordFrequency
      .slice(0, 5)
      .map((w) => w.word)
      .join(", ");
    practiceItems.push(`Practice these challenging words: ${topErrorWords}`);
  }

  if (metrics.shortWordsErrorRate > metrics.overallErrorRate) {
    practiceItems.push(
      `Practice precision for short, common words which may receive less attention.`
    );
  }

  if (metrics.longWordsErrorRate > metrics.overallErrorRate) {
    practiceItems.push(
      `For longer words, try breaking them down into syllables in your mind as you type.`
    );
    practiceItems.push(
      `Practice typing exercises specifically focused on longer words.`
    );
  }

  if (metrics.wordsWithSpecialCharsErrorRate > metrics.overallErrorRate) {
    practiceItems.push(
      `Dedicate practice time to words with special characters or punctuation.`
    );
    practiceItems.push(
      `Work on finger positioning for reaching less common keys.`
    );
  }

  recommendations.push({
    category: "Focused Practice",
    items: practiceItems,
  });

  // Technique recommendations
  recommendations.push({
    category: "Technique Adjustments",
    items: [
      "Maintain proper posture with forearms parallel to the floor.",
      "Keep your fingers curved and resting lightly on the home row.",
      "Look at the screen, not your fingers, to develop muscle memory.",
      "Take short breaks to relax your hands and wrists.",
      "Start with accuracy over speed - speed will naturally improve as accuracy becomes consistent.",
    ],
  });

  // General recommendations
  recommendations.push({
    category: "General Recommendations",
    items: [
      "Schedule regular typing sessions specifically targeting your problem words.",
      "Use focused typing drills that emphasize the challenging words and patterns identified.",
      "Consider advanced typing software that adapts to your specific error patterns.",
      "Practice in short, focused sessions rather than long marathons to maintain concentration.",
      "Monitor your progress by comparing error rates between sessions.",
    ],
  });

  return recommendations;
}

export function processMonkeyTypeData(
  data: MonkeyTypeSession[]
): MonkeyTypeData {
  // Transform the data for analysis
  const allWords: WordData[] = [];

  for (const session of data) {
    const sessionTime = new Date(session.time);

    for (const wordData of session.words) {
      const word = wordData.word;

      allWords.push({
        sessionId: session.id,
        sessionTime,
        word,
        reason: wordData.reason,
        wordLength: word.length,
        hasSpecialChars: /[^a-zA-Z0-9]/.test(word),
        hasNumbers: /[0-9]/.test(word),
        isUppercase: word === word.toUpperCase() && word !== word.toLowerCase(),
        isCapitalized:
          word.length > 0 &&
          word[0] === word[0].toUpperCase() &&
          word[0] !== word[0].toLowerCase(),
      });
    }
  }

  // Create session summary
  const sessionIds = Array.from(
    new Set(allWords.map((w) => w.sessionId)).values()
  );
  const sessionSummary: SessionSummary[] = [];

  sessionIds.forEach((sessionId) => {
    const sessionWords = allWords.filter((w) => w.sessionId === sessionId);
    const sessionTime = sessionWords[0].sessionTime;

    const totalWords = sessionWords.length;
    const errors = sessionWords.filter((w) => w.reason === "error").length;
    const corrected = sessionWords.filter(
      (w) => w.reason === "corrected"
    ).length;
    const errorRate = (errors / totalWords) * 100;

    sessionSummary.push({
      sessionId,
      timestamp: sessionTime,
      totalWords,
      errors,
      corrected,
      errorRate,
    });
  });

  // Filter error and corrected words
  const errorWords = allWords.filter((w) => w.reason === "error");
  const correctedWords = allWords.filter((w) => w.reason === "corrected");

  // Calculate word frequencies
  const errorWordFrequency = getWordFrequency(errorWords);
  const correctedWordFrequency = getWordFrequency(correctedWords);

  // Calculate letter frequencies
  const errorWordsText = errorWords.map((w) => w.word);
  const correctedWordsText = correctedWords.map((w) => w.word);

  const errorLetterCounts = countLetters(errorWordsText);
  const correctedLetterCounts = countLetters(correctedWordsText);

  const errorLetterFrequency: LetterFrequency[] = Object.entries(
    errorLetterCounts
  )
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => b.count - a.count);

  const correctedLetterFrequency: LetterFrequency[] = Object.entries(
    correctedLetterCounts
  )
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => b.count - a.count);

  // Calculate error metrics
  const totalWords = allWords.length;
  const totalErrorWords = errorWords.length;
  const overallErrorRate = (totalErrorWords / totalWords) * 100;

  const metrics: ErrorMetrics = {
    overallErrorRate,
    shortWordsErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.wordLength < 4
    ),
    mediumWordsErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.wordLength >= 4 && w.wordLength <= 6
    ),
    longWordsErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.wordLength > 6
    ),
    wordsWithSpecialCharsErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.hasSpecialChars
    ),
    wordsWithNumbersErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.hasNumbers
    ),
    uppercaseWordsErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.isUppercase
    ),
    capitalizedWordsErrorRate: calculateErrorRateForCondition(
      allWords,
      (w) => w.isCapitalized
    ),
  };

  // Calculate summary statistics
  const avgErrorWordLength =
    errorWords.length > 0
      ? errorWords.reduce((sum, w) => sum + w.wordLength, 0) / errorWords.length
      : 0;

  const avgCorrectedWordLength =
    correctedWords.length > 0
      ? correctedWords.reduce((sum, w) => sum + w.wordLength, 0) /
        correctedWords.length
      : 0;

  const mostCommonErrorWord =
    errorWordFrequency.length > 0 ? errorWordFrequency[0].word : "N/A";

  const sessionWithHighestErrorRate =
    sessionSummary.length > 0
      ? `Session ${
          sessionSummary.reduce((prev, current) =>
            prev.errorRate > current.errorRate ? prev : current
          ).sessionId
        }`
      : "N/A";

  const sessionWithLowestErrorRate =
    sessionSummary.length > 0
      ? `Session ${
          sessionSummary.reduce((prev, current) =>
            prev.errorRate < current.errorRate ? prev : current
          ).sessionId
        }`
      : "N/A";

  const summary: Summary = {
    totalWords,
    errorWords: totalErrorWords,
    correctedWords: correctedWords.length,
    errorRate: overallErrorRate,
    correctionRate: (correctedWords.length / totalWords) * 100,
    sessionCount: sessionIds.length,
    avgErrorWordLength,
    avgCorrectedWordLength,
    mostCommonErrorWord,
    sessionWithHighestErrorRate,
    sessionWithLowestErrorRate,
  };

  // Generate recommendations
  const recommendations = generateRecommendations({
    allWords,
    sessionSummary,
    errorWords,
    correctedWords,
    errorWordFrequency,
    correctedWordFrequency,
    errorLetterFrequency,
    correctedLetterFrequency,
    metrics,
    summary,
    recommendations: [],
  });

  return {
    allWords,
    sessionSummary,
    errorWords,
    correctedWords,
    errorWordFrequency,
    correctedWordFrequency,
    errorLetterFrequency,
    correctedLetterFrequency,
    metrics,
    summary,
    recommendations,
  };
}
