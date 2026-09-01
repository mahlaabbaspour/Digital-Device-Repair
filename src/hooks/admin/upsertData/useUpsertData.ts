import { useQuery } from '@tanstack/react-query'

import { getRepairsUpsertData } from '@/libs/admin/upsertData/upsertData'

export const useGetRepairsUpsertData = () => {
  return useQuery({
    queryKey: ['repairs-upsertData'],
    queryFn: getRepairsUpsertData
  })
}
