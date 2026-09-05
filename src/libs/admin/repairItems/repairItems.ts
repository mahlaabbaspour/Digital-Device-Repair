import { api } from '@/libs/api'

export const createRepairItems = async ({ repairId, payload }: { repairId: number | string; payload: any }) => {
  try {
    const res = await api.post(`/repair/${repairId}/repair-item/store`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getRepairItems = async ({
  repairId,
  repairItemId
}: {
  repairId: number | string
  repairItemId: number | string
}) => {
  try {
    const res = await api.get(`/repair/${repairId}/repair-item/show/${repairItemId}`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const getRepairItemsList = async (repairId: number | string) => {
  try {
    const res = await api.get(`/repair/${repairId}/repair-item`)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}

export const updateRepairItems = async ({
  repairId,
  repairItemId,
  payload
}: {
  repairId: number | string
  repairItemId: number | string
  payload: any
}) => {
  try {
    const res = await api.put(`/repair/${repairId}/repair-item/update/${repairItemId}`, payload)

    return res.data
  } catch (error: any) {
    throw error.res?.data || error
  }
}
