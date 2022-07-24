export interface UserSchema {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  profilePic?: string;
  isActive: boolean;
}

export interface FaviouriteSchema {
  mediaType: string;
  userId: number;
  mediaId: string;
  mediaName: string;
  bannerImageUrl: string;
}

export enum LOGIN_SCHEME {
  'GOOGLE' = 'GOOGLE',
  'FACEBOOK' = 'FACEBOOK',
  'OTP_BASED' = 'OTP_BASED',
}

export interface LoginPayload {
  loginScheme: LOGIN_SCHEME;
  name?: string;
  email?: string;
  profilePic?: string;
  idToken?: string;
  fbToken?: string;
}

export interface LoginResponseSchema {
  success: boolean;
  message: string;
  data: UserSchema;
  token: string;
}

export interface RenewTokenPayload {
  loginScheme: LOGIN_SCHEME;
  idToken?: string;
  fbToken?: string;
  refreshToken?: string;
}

export interface RenewTokenResponse {
  success: boolean;
  data: UserSchema;
  token: string;
  refreshToken: string;
}
