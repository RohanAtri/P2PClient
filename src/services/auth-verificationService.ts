import {api} from '../lib/interceptor/axios'
import type { CustomAxiosConfig } from '../lib/types/CustomAxiosConfig'

export const getPrimaryQuestions = async () => {
  const config: CustomAxiosConfig = {
    useEncryptedHeaders: true
  }

  const response = await api.get('customers-auth/primary-screening-questions', config)
  return response.data
}

export const sendOtptoUser = async (body: any) => {
  const config: CustomAxiosConfig = {
    useEncryptedHeaders: true
  }

  const response = await api.post('customers-auth/sent-otp', body, config)
  return response.data
}

export const validateOtptoUser = async (body: any) => {
  const config: CustomAxiosConfig = {
    useEncryptedHeaders: true
  }

  const response = await api.post('customers-auth/validate-otp', body, config)
  return response.data
}

export const getUserstatusTracker = async () => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.get('customers/status-tracker', config)
  return response.data
}

export const savePrimaryQuestion = async (body: any) => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.post('customers/primary-screening-questions/save', body, config)
  return response.data;
}

export const panValidate = async (body: any) => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.post('customers/verification', body, config)
  return response.data
}

export const getBankList = async () => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.get('customers/bank-list', config)
  return response.data
}

export const saveBank = async (selectedBankCode:string) => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.get(`customers/bank-statement?bank_code=${selectedBankCode}`, config)
  return response.data
}

export const logoutUser = async () => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.delete('users/logout', config)
  return response.data
}

export const validateTOken = async () => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.get('customers/auth/validate-token', config)
  return response.data;
}

export const getReviewData = async () => {
  const config: CustomAxiosConfig = {
    useAccessToken: true
  }

  const response = await api.get('customers/loan/initial', config)
  return response.data;
}