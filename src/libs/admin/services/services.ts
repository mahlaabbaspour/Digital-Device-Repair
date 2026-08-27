import { api } from '@/libs/api'

export const createServices = async (payload: any) => {
  try {
    const res = await api.post('/service/store', payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getServices = async (id: number | string) => {
  try {
    const res = await api.get(`/service/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateServices = async ({ payload, id }: { id: number | string; payload: any }) => {
  try {
    const res = await api.put(`/service/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
