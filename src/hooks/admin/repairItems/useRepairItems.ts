import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import {
  createRepairItems,
  getRepairItems,
  getRepairItemsList,
  updateRepairItems
} from '@/libs/admin/repairItems/repairItems'

export function useCreateRepairItems() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createRepairItems,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['repair-items']
      })

      toast.success('با موفقیت ایجاد شد')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error?.message ?? 'خطایی رخ داد!')
    }
  })

  return { mutateAsync, isPending, error }
}

export function useGetRepairItemsList(repairId: number | string) {
  return useQuery({
    queryKey: ['repair-items', repairId],
    queryFn: () => getRepairItemsList(repairId),
    enabled: Boolean(repairId)
  })
}

export function useGetRepairItems({
  repairId,
  repairItemId
}: {
  repairId: number | string
  repairItemId: number | null
}) {
  return useQuery({
    queryKey: ['repair-items', repairId, repairItemId],
    queryFn: () =>
      getRepairItems({
        repairId,
        repairItemId: repairItemId!
      }),
    enabled: Boolean(repairId) && Boolean(repairItemId)
  })
}

export function useUpdateRepairItems() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateRepairItems,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['repair-items']
      })

      toast.success('با موفقیت ویرایش شد')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? error?.message ?? 'خطایی رخ داد!')
    }
  })

  return { mutateAsync, isPending, error }
}
