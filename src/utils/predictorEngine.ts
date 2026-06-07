import { type CutoffData, type College } from '../types';
import { mockCutoffs, mockColleges } from './mockData';

export interface PredictionResult {
  college: College;
  course: string;
  closingRank: number;
  chance: 'High' | 'Moderate' | 'Low'; // Chance of admission
  quota: string;
}

export const predictColleges = (
  exam: 'JEE Main' | 'NEET' | 'CAT',
  rankOrPercentile: number,
  category: CutoffData['category'],
  homeState: string
): PredictionResult[] => {
  const results: PredictionResult[] = [];

  // Filter cutoffs by exam and category
  const activeCutoffs = mockCutoffs.filter(
    (c) => c.exam === exam && c.category === category
  );

  activeCutoffs.forEach((cutoff) => {
    const college = mockColleges.find((col) => col.id === cutoff.collegeId);
    if (!college) return;

    // Determine Quota eligibility
    // If cutoff is Home State quota, user's state must match college's state
    if (cutoff.quota === 'Home State' && college.state !== homeState) {
      return; // Not eligible for Home State quota
    }

    let chance: 'High' | 'Moderate' | 'Low' | null = null;

    if (exam === 'CAT') {
      // For CAT, higher percentile score is better
      // rankOrPercentile is entered as e.g. 99.2 (Percentile)
      const userScore = rankOrPercentile * 100; // 99.2 -> 9920
      const closingScore = cutoff.closingRank; // e.g. 9900 (99.0%)

      if (userScore >= closingScore + 100) {
        chance = 'High';
      } else if (userScore >= closingScore - 50 && userScore < closingScore + 100) {
        chance = 'Moderate';
      } else if (userScore >= closingScore - 200 && userScore < closingScore - 50) {
        chance = 'Low';
      }
    } else {
      // For JEE Main & NEET, lower rank number is better
      const userRank = rankOrPercentile;
      const closingRank = cutoff.closingRank;

      if (userRank <= closingRank * 0.85) {
        chance = 'High';
      } else if (userRank > closingRank * 0.85 && userRank <= closingRank * 1.15) {
        chance = 'Moderate';
      } else if (userRank > closingRank * 1.15 && userRank <= closingRank * 1.4) {
        chance = 'Low';
      }
    }

    if (chance) {
      results.push({
        college,
        course: cutoff.course,
        closingRank: cutoff.closingRank,
        chance,
        quota: cutoff.quota
      });
    }
  });

  // Sort results: High chance first, then moderate, then low
  const chancePriority = { High: 3, Moderate: 2, Low: 1 };
  results.sort((a, b) => chancePriority[b.chance] - chancePriority[a.chance]);

  return results;
};
