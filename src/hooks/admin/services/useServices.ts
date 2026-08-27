import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createServices, getServices, updateServices } from '@/libs/admin/services/services'

export function useCreateServices() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createServices,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['service'] })
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

export function useGetServices(id: number | string | null) {
  return useQuery({
    queryKey: ['service', id],
    queryFn: () => getServices(id as number | string),
    enabled: id !== null
  })
}

export function useUpdateServices() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateServices,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['service'] })
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
