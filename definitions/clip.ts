export interface ClipSchema {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  bannerImageUrl: string;
  viewCount: number;
  likeCount: number;
  isActive: boolean;
}

export interface GetClipResponse {
  success: boolean;
  data: ClipSchema[];
}
