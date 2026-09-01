import { api } from '@/libs/api'

export const createRepairs = async (payload: any) => {
  try {
    const res = await api.post('/repair/store', payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getRepairs = async (id: number | string) => {
  try {
    const res = await api.get(`/repair/show/${id}`)

    return res.data.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateRepairs = async ({ payload, id }: { id: number | string; payload: any }) => {
  try {
    const res = await api.put(`/repair/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
