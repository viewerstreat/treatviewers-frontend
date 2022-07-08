import { baseURL, Url } from "../utils/urls";
import RestService from "./rest";

export const serviceClient = new RestService({
    baseURL: baseURL,
});

export const GenerateOTP = (payload: number) => {
    return serviceClient.get(Url.GenerateOTP +"?phone="+payload);
  };
export const CreateUser = (payload: UserCreatePayload) => {
    return serviceClient.get(Url.GenerateOTP +"?phone="+payload);
};




export interface UserCreatePayload{
    name: string;
    email: string;
    phone: string;
    profilePic: string;
}
  