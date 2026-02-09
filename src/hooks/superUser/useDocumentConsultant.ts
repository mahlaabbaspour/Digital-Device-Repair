import axiosConfig from '@/libs/auth/axios'
import { createCommandConsultant } from '@/libs/superUser/documentConsultant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useFetchCalenderSuperUser = ({
  id,
  date,
  enabled
}: {
  id: string
  date: string | null
  enabled?: boolean
}) => {
  return useQuery({
    queryKey: ['calendarConsultation', id, date],
    queryFn: async () => {
      const res = await axiosConfig.get(`/super-user/${id}/meeting/core/consultation-meeting/calender`, {
        params: { date }
      })
      return res.data?.data
    },
    enabled
  })
}

export function useCommandConstultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createCommandConsultant({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { id, date } = variables
      queryClient.invalidateQueries({ queryKey: ['calendarConsultation', id, date] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
