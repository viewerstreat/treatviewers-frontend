import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/useTypedSelectorHook';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class RestService {
  client: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.client = axios.create(config);
    this.client.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers['Authorization'] ='Bearer '+  token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.client.interceptors.response.use(
      async (response) => {
        if (response?.data?.token) {
          await setToken(response?.data?.token);
          this.client.defaults.headers.common['Authorization'] = response?.data?.token;
        }
        return response;
      },
      async (error) => {
        return Promise.reject(error);
      }
    )
  }

  get(endpoint: string) {
    return this.client.get<any>(endpoint);
  }

  post(endpoint: string, payload: any) {
    return this.client.post<any>(endpoint, payload);
  }
  
  
}

const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
}

const setToken = async (token: string) => {
  return await AsyncStorage.setItem('token', token)
}
