import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export default class RestService {
  client: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);
    this.client.interceptors.request.use(
      async (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get(endpoint: string) {
    return this.client.get<any>(endpoint);
  }

  post(endpoint: string, payload: any) {
    return this.client.post<any>(endpoint, payload);
  }
}