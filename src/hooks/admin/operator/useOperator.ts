import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createOperator, getOperator, updateOperator } from '@/libs/admin/operator/operator'

export function useCreateOperator() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createOperator,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['operator'] })
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

export function useGetOperator(id: number | string | null) {
  return useQuery({
    queryKey: ['expert', id],
    queryFn: () => getOperator(id as number | string),
    enabled: id !== null
  })
}

export function useUpdateOperator() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateOperator,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['operator'] })
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
