import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createExpert, getExpert, updateExpert } from '@/libs/admin/expert/expert'

export function useCreateExpert() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createExpert,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['expert'] })
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

export function useGetExpert(id: number | string | null) {
  return useQuery({
    queryKey: ['expert', id],
    queryFn: () => getExpert(id as number | string),
    enabled: id !== null
  })
}

export function useUpdateExpert() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateExpert,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['expert'] })
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
