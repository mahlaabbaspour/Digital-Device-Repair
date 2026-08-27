import { api } from '@/libs/api'

export const createProduct = async (payload: any) => {
  try {
    const res = await api.post('/product/store', payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getProduct = async (id: number | string) => {
  try {
    const res = await api.get(`/product/show/${id}`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateProduct = async ({ payload, id }: { id: number | string; payload: any }) => {
  try {
    const res = await api.put(`/product/update/${id}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
