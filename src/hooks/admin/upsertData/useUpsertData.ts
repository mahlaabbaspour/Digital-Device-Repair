import { useQuery } from '@tanstack/react-query'

import { getRepairItemUpsertData, getRepairsUpsertData } from '@/libs/admin/upsertData/upsertData'

export const useGetRepairsUpsertData = () => {
  return useQuery({
    queryKey: ['repairs-upsertData'],
    queryFn: getRepairsUpsertData
  })
}

export const useGetRepairItemUpsertData = (repairId: number) => {
  return useQuery({
    queryKey: ['repair-item-upsert-data', repairId],
    queryFn: () => getRepairItemUpsertData(repairId),
    enabled: !!repairId
  })
}
