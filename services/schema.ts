// interfaces
export interface UserCreatePayload {
  name: string;
  email: string;
  phone: string;
}
export interface VerifyOTPPayload {
  phone: number;
  otp: string;
}

export type MovieResponseSchema = {
  success: boolean;
  data: {
    _id: string;
    name: string;
    description: string;
    tags: string[];
    bannerImageUrl: string;
    videoUrl: string;
    moviePromotionExpiry: number;
    viewCount: number;
    likeCount: number;
    sponsoredBy: string;
    sponsoredByLogo?: string;
    releaseDate: number;
  }[];
  message: string;
};

export type ContestResponseSchema = {
  success: boolean;
  message: string;
  data: {
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
  }[];
};
