import {baseURL, Url} from '../utils/urls';
import RestService from './rest';
import {
  UserCreatePayload,
  VerifyOTPPayload,
  MovieResponseSchema,
  ContestResponseSchema,
} from './schema';

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

export const FaviouriteGet=(payload: FaviouritesPayload)=>{    
  return serviceClient.get(Url.FaviouritesUrl + 
    '?mediaType='+payload.mediaType+'&pageIndex='
    +payload.pageIndex + '&pageSize='+payload.pageSize)
}

// interfaces
export interface UserCreatePayload {
  name: string;
  email: string;
  phone: string;
}
export interface VerifyOTPPayload{
  phone: number;
  otp: string;
}

export interface FaviouritesPayload {
  mediaType?: string;
  pageSize?: number;
  pageIndex?: number;
}
export const FetchMovies = () => {
  return serviceClient.client.get<MovieResponseSchema>(Url.FetchMovie);
};

export const FetchContests = () => {
  return serviceClient.client.get<ContestResponseSchema>(Url.FetchContest);
};
