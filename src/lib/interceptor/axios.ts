import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from 'axios'
import {encryptByKeyV2} from '../utils/crypto'
import type { CustomAxiosConfig } from '@/lib/types/CustomAxiosConfig'

import { redirect } from 'next/navigation'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const customConfig = config as CustomAxiosConfig

  const headers = config.headers as AxiosHeaders

  if (customConfig.useEncryptedHeaders) {
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || ''
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET || ''
    const authCode = process.env.NEXT_PUBLIC_AUTH_CODE || ''
    const encryptionKey = process.env.NEXT_PUBLIC_ENCRYPION_KEY || ''

    const encryptedClientId = await encryptByKeyV2(clientId, encryptionKey)
    const encryptedClientSecret = await encryptByKeyV2(clientSecret, encryptionKey)

    headers.set('clientid', encryptedClientId)
    headers.set('clientsecret', encryptedClientSecret)
    headers.set('authcode', authCode)
  }

  if (customConfig.useAccessToken && typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const statusCode = (error.response?.data as any)?.statusCode

    if (statusCode === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('access_token') 
      localStorage.removeItem('user_code') 
      window.location.href = '/login' 
    }

    return Promise.reject(error)
  }
)

