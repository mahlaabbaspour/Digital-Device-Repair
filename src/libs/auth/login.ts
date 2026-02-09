import axiosConfig from './axios'

export async function login(dataLogin: any) {
  console.log(dataLogin, 'data login')
  try {
    const response = await axiosConfig.post(`/auth/login`, dataLogin)
    const data = response.data

    console.log(data, 'dataLogin')

    return data
  } catch (error) {
    throw error
  }
}
