import { baseURL, Url } from "../utils/urls";
import RestService from "./rest";

export const serviceClient = new RestService({
    baseURL: baseURL,
});

export const GenerateOTP = (payload: number) => {
    return serviceClient.get(Url.GenerateOTP +"?phone="+payload);
  };
export const CreateUser = (payload: UserCreatePayload) => { 
    console.log(payload,Url.CreateUser);
       
    return serviceClient.post(Url.CreateUser, payload);
};




export interface UserCreatePayload{
    name: string;
    email: string;
    phone: string;
}
  