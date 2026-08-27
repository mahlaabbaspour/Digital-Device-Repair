import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createCustomer, getCustomer, updateCustomer } from '@/libs/admin/customer/customer'

export function useCreateCustomer() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createCustomer,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['customer'] })
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

export function useGetCustomer(id: number | string | null) {
  return useQuery({
    queryKey: ['expert', id],
    queryFn: () => getCustomer(id as number | string),
    enabled: id !== null
  })
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateCustomer,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['customer'] })
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
