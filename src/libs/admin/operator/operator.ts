import { api } from '@/libs/api'

export const createOperator = async (payload: any) => {
  try {
    const res = await api.post('/operator/store', payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getOperator = async (id: number | string) => {
  try {
    const res = await api.get(`/operator/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateOperator = async ({ payload, id }: { id: number | string; payload: any }) => {
  try {
    const res = await api.put(`/operator/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
