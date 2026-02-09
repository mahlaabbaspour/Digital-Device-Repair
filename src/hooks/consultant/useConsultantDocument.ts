import axiosConfig from '@/libs/auth/axios'
import { createCommentConsultant, deleteCommentConsultant, updateCommentConsultant } from '@/libs/user/userDocument'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

////////////////////////comment/////////////////////

export const useFetchCommentConsultant = ({ id, rowId }: { id: string; rowId: string }) => {
  return useQuery({
    queryKey: ['comment', id, rowId],
    enabled: !!id && !!rowId,
    queryFn: async () => {
      const res = await axiosConfig.get(`/advisor/${id}/core/consultation-document/${rowId}/comment`)
      return res.data?.data
    }
  })
}

export function useCreateCommentConsultant() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createCommentConsultant({ data, id, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateCommentConsultant() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId, commentId }: any) => updateCommentConsultant({ data, id, rowId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteCommentConsultant() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCommentConsultant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
