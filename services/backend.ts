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
import {GetClipResponse} from '../definitions/clip';
import {GetQuesResponse, PlayTrackerResponse} from '../definitions/quiz';

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
  return getClient().get<RenewTokenResponse>(url);
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

export const FetchContestById = (contestId: string) => {
  const url = `${Url.FetchContest}?_id=${contestId}`;
  return getClient().get<ContestResponseSchema>(url);
};

export const SocialLogin = (payload: LoginPayload) => {
  return getClient().post<LoginResponseSchema>(Url.SocialLogin, payload);
};

export const FetchClips = () => {
  let url = Url.GetClip + '?pageSize=1';
  return getClient().get<GetClipResponse>(url);
};

export const GetPlayTracker = (contestId: string) => {
  let url = `${Url.GetPlayTracker}?contestId=${contestId}`;
  return getClient().get<PlayTrackerResponse>(url);
};

export const StartPlay = (contestId: string) => {
  let url = `${Url.StartPlay}`;
  return getClient().post<PlayTrackerResponse>(url, {contestId});
};

export const PayForContest = (contestId: string) => {
  return getClient().post<PlayTrackerResponse>(Url.PayForContest, {contestId});
};

export const GetNextQues = (contestId: string) => {
  let url = `${Url.GetNextQues}?contestId=${contestId}`;
  return getClient().get<GetQuesResponse>(url);
};

export const SaveAnswer = (contestId: string, questionNo: number, selectedOptionId: number) => {
  return getClient().post<PlayTrackerResponse>(Url.AnswerAQues, {
    contestId,
    questionNo,
    selectedOptionId,
  });
};

export const FinishPlay = (contestId: string) => {
  return getClient().post<PlayTrackerResponse>(Url.FinishPlay, {contestId});
};

export const GetWalletBalance = () => {
  return getClient().get<{success: boolean; balance: number}>(Url.WalletBalance);
};
