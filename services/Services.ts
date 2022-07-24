import {baseURL, Url} from '../utils/urls';
import RestService from './rest';
import {
  LoginPayload,
  LoginResponseSchema,
  RenewTokenPayload,
  RenewTokenResponse,
} from '../definitions/user';
import {
  MovieResponseSchema,
  ContestResponseSchema,
  UserCreatePayload,
  VerifyOTPPayload,
  FaviouritesPayload,
} from './schema';

export const serviceClient = new RestService({baseURL: baseURL});
const getClient = () => serviceClient.client;

export const GenerateOTP = (phone: number) => {
  const url = `${Url.GenerateOTP}?phone=${phone}`;
  return serviceClient.get(url);
};
export const CreateUser = (payload: UserCreatePayload) => {
  return serviceClient.post(Url.CreateUser, payload);
};

export const VerifyOTP = (payload: VerifyOTPPayload) => {
  return serviceClient.get(Url.VerifyOTPUrl + '?phone=' + payload.phone + '&otp=' + payload.otp);
};

export const RenewToken = (payload: RenewTokenPayload) => {
  return getClient().post<RenewTokenResponse>(Url.RenewTokenUrl, payload);
};

export const FaviouriteGet = (payload: FaviouritesPayload) => {
  const {mediaType, pageIndex, pageSize} = payload;
  const url = `${Url.FaviouritesUrl}?mediaType=${mediaType}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
  return serviceClient.get(url);
};

export const FetchMovies = () => {
  return getClient().get<MovieResponseSchema>(Url.FetchMovie);
};

export const FetchContests = () => {
  return getClient().get<ContestResponseSchema>(Url.FetchContest);
};

export const SocialLogin = (payload: LoginPayload) => {
  return getClient().post<LoginResponseSchema>(Url.SocialLogin, payload);
};
