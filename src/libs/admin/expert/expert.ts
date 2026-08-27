import { api } from '@/libs/api'

export const createExpert = async (payload: any) => {
  try {
    const res = await api.post('/expert/store', payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getExpert = async (id: number | string) => {
  try {
    const res = await api.get(`/expert/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateExpert = async ({ payload, id }: { id: number | string; payload: any }) => {
  try {
    const res = await api.put(`/expert/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
