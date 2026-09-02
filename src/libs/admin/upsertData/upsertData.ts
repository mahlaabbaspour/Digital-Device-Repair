import { api } from '@/libs/api'

export const getRepairsUpsertData = async () => {
  try {
    const res = await api.get('/repair/upsert-data')

    return res.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}

export const getRepairItemUpsertData = async (repairId: number) => {
  try {
    const response = await api.get(`/repair/${repairId}/repair-item/upsert-data`)

    return response.data
  } catch (error: any) {
    throw error.response?.data || error
  }
}
