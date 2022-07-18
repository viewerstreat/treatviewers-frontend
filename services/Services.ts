import {baseURL, Url} from '../utils/urls';
import RestService from './rest';

export const serviceClient = new RestService({
  baseURL: baseURL,
});

export const GenerateOTP = (payload: number) => {
  return serviceClient.get(Url.GenerateOTP + '?phone=' + payload);
};
export const CreateUser = (payload: UserCreatePayload) => {
  return serviceClient.post(Url.CreateUser, payload);
};

export const VerifyOTP = (payload: VerifyOTPPayload) => {
  return serviceClient.get(Url.VerifyOTPUrl + '?phone=' + payload.phone + '&otp=' + payload.otp);
};

export const RenewToken = () => {
  return serviceClient.get(Url.RenewTokenUrl);
};

type ResponseSchema = {
  success: boolean;
  data: {
    name: string;
    bannerImageUrl: string;
    moviePromotionExpiry: number;
  }[];
  message: string;
};
export const FetchMovies = () => {
  return serviceClient.client.get<ResponseSchema>(Url.FetchMovie);
};

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
