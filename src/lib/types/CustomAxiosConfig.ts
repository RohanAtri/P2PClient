import { AxiosRequestConfig } from 'axios'

export interface CustomAxiosConfig extends AxiosRequestConfig {
  useEncryptedHeaders?: boolean
  useAccessToken?: boolean
}
