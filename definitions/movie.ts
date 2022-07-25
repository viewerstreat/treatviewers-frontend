export interface MovieSchema {
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
}

export type MovieResponseSchema = {
  success: boolean;
  data: MovieSchema[];
  message: string;
};
