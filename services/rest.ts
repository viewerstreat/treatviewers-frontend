import axios, {AxiosRequestConfig, AxiosInstance} from 'axios';
import {store} from '../redux/store';

export default class RestService {
  client: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);

    const reqHandler = (cfg: AxiosRequestConfig) => {
      const token = store.getState().token.token;
      if (token) {
        if (!cfg.headers) {
          cfg.headers = {};
        }
        cfg.headers.Authorization = `Bearer ${token}`;
      }
      return cfg;
    };

    const errorHandler = (err: any) => {
      return Promise.reject(err);
    };

    this.client.interceptors.request.use(reqHandler, errorHandler);
  }

  get(endpoint: string) {
    return this.client.get<any>(endpoint);
  }

  post(endpoint: string, payload: any) {
    return this.client.post<any>(endpoint, payload);
  }
}
