export enum PRIZE_SELECTION {
  TOP_WINNERS = 'TOP_WINNERS',
  RATIO_BASED = 'RATIO_BASED',
}

export interface ContestSchema {
  _id: string;
  title: string;
  category: string;
  movieId?: string;
  sponsoredBy: string;
  sponsoredByLogo?: string;
  bannerImageUrl: string;
  videoUrl: string;
  entryFee: number;
  prizeSelection?: string;
  topWinnersCount?: number; // winners count if the prize selection is based on TOP_WINNERS basis
  prizeRatioNumerator?: number; // prize ratio numerator value
  prizeRatioDenominator?: number; // prize ratio denominator value
  prizeValue?: number; // value of the top Prize that can be won
  startTime: number;
  endTime: number;
  questionCount: number;
  status: string;
}

export type ContestResponseSchema = {
  success: boolean;
  message: string;
  data: ContestSchema[];
};

export interface OngoingContestsData {
  key: string;
  title: string;
  sponsoredBy: string;
  topPrize: string;
  prizeRatio: string;
  entryFee: string;
  timeRemaining: string;
}
