import { api } from '@/libs/api'

export const getRepairsUpsertData = async () => {
  try {
    const res = await api.get('/repair/upsert-data')

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
