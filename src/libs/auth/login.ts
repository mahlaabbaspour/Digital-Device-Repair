import axiosConfig from './axios'

export async function login(dataLogin: any) {
  try {
    const response = await axiosConfig.post(`/auth/login`, dataLogin)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
