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
  prizeSelection: string;
  topWinnersCount?: number;
  prizeRatioNumerator?: number;
  prizeRatioDenominator?: number;
  prizeValue: number;
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
