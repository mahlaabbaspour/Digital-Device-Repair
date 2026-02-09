import axiosConfig from '@/libs/auth/axios'
import { createCommentUser, deleteCommentUser, updateCommentUser } from '@/libs/consultant/consultantDocument'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

////////////////////////comment/////////////////////

export const useFetchComment = ({ id, rowId, advisorId }: { id: string; rowId: string; advisorId: string }) => {
  return useQuery({
    queryKey: ['comment', id, rowId, advisorId],
    enabled: !!id && !!rowId && !!advisorId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(`/user/${id}/core/consultation-document/${rowId}/comment`)
      return res.data?.data
    }
  })
}

export function useCreateCommentUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createCommentUser({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { id, rowId, advisorId } = variables
      queryClient.invalidateQueries({ queryKey: ['comment', id, rowId, advisorId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateCommentUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId, commentId }: any) => updateCommentUser({ data, id, rowId, commentId }),
    onSuccess: (_, variables) => {
      const { id, rowId, advisorId } = variables
      queryClient.invalidateQueries({ queryKey: ['comment', id, rowId, advisorId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteCommentUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteCommentUser,
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

//////////////////////////////////////////////////

export const useFetchCalenderUser = ({ id, date, enabled }: { id: string; date: string | null; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['calendarUser', id, date],
    queryFn: async () => {
      const res = await axiosConfig.get(`/user/${id}/meeting/core/consultation-meeting/calender`, {
        params: { date }
      })
      return res.data?.data
    },
    enabled
  })
}
