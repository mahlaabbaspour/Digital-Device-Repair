import { api } from '@/libs/api'

export const createCustomer = async (payload: any) => {
  try {
    const res = await api.post('/customer/store', payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getCustomer = async (id: number | string) => {
  try {
    const res = await api.get(`/customer/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateCustomer = async ({ payload, id }: { id: number | string; payload: any }) => {
  try {
    const res = await api.put(`/customer/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
