import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createRepairs, getRepairs, updateRepairs } from '@/libs/admin/repairs/repairs'

export function useCreateRepairs() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createRepairs,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['repair'] })
      toast.success('با موفقیت ایجاد شد')
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'خطایی رخ داد!')
    }
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}

export function useGetRepairs(id: number | string | null) {
  return useQuery({
    queryKey: ['repair', id],
    queryFn: () => getRepairs(id as number | string),
    enabled: id !== null
  })
}

export function useUpdateRepairs() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateRepairs,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['repair'] })
      toast.success('با موفقیت ویرایش شد')
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? 'خطایی رخ داد!')
    }
  })

  return {
    mutateAsync,
    isPending,
    error
  }
}
