import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { createProduct, getProduct, updateProduct } from '@/libs/admin/product/product'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: createProduct,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['product'] })
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

export function useGetProduct(id: number | string | null) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id as number | string),
    enabled: id !== null
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: updateProduct,

    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['product'] })
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
