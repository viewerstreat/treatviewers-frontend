import {baseURL, Url} from '../utils/urls';
import RestService from './rest';
import {
  FaviouritesPayload,
  LoginPayload,
  LoginResponseSchema,
  RenewTokenPayload,
  RenewTokenResponse,
  UserCreatePayload,
  VerifyOTPPayload,
} from '../definitions/user';
import {MovieResponseSchema} from '../definitions/movie';
import {ContestResponseSchema} from '../definitions/contest';

export const serviceClient = new RestService({baseURL: baseURL});
const getClient = () => serviceClient.client;

export const GenerateOTP = (phone: number) => {
  const url = `${Url.GenerateOTP}?phone=${phone}`;
  return getClient().get(url);
};
export const CreateUser = (payload: UserCreatePayload) => {
  return getClient().post(Url.CreateUser, payload);
};

export const VerifyOTP = ({phone, otp}: VerifyOTPPayload) => {
  const url = `${Url.VerifyOTPUrl}?phone=${phone}&otp=${otp}`;
  return getClient().get(url);
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
