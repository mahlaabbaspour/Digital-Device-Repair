import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/libs/auth/axios'
import {
  cancelMeeting,
  createCalendar,
  createCheckCalendar,
  createCheckSingleCalendar,
  createSingleMeetingCalender,
  deleteSinglMeeting,
  deleteWatingList,
  paymentMeeting,
  reserveMeeting,
  statusCancelMeeting,
  updateSingleMeetingCalender,
  watingListMeeting
} from '@/libs/institution/advisoryMeeting/calendar'
import { toast } from 'react-toastify'

export const useFetchCalender = ({ id, date, enabled }: { id: string; date: string | null; enabled?: boolean }) => {
  return useQuery({
    queryKey: ['calendar', id, date],
    queryFn: async () => {
      const res = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting/calender`, {
        params: { date }
      })
      return res.data?.data
    },
    enabled
  })
}

export function useCreateCheckClanderGroup() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCheckCalendar
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['calendar'] })
    //   toast.success('با موفقیت ایجاد شد')
    // },
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useCreateCheckSingleClander() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCheckSingleCalendar
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['calendar'] })
    //   toast.success('با موفقیت ایجاد شد')
    // },
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useCreateCalenderGroup() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCalendar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
      // toast.success('با موفقیت ایجاد شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useCreateSingleMeetingCalender() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSingleMeetingCalender,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
      // toast.success('با موفقیت ایجاد شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useUpdateSingleMeetingCalender() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSingleMeetingCalender,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
      // toast.success('با موفقیت ایجاد شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useDeleteSingleMeeting() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteSinglMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useReserveMeeting() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, date }: any) => reserveMeeting({ data, id, date }),
    onSuccess: (_, variables) => {
      const { id, date } = variables
      queryClient.invalidateQueries({ queryKey: ['calendar', id, date] })
      // toast.success('با موفقیت انجام شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function usePaymentMeeting() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId, date }: any) => paymentMeeting({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { id, date } = variables
      queryClient.invalidateQueries({ queryKey: ['calendar', id, date] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useCancelMeeting() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, rowId, date }: any) => cancelMeeting({ id, rowId, date }),
    onSuccess: (_, variables) => {
      const { id, date } = variables
      queryClient.invalidateQueries({ queryKey: ['calendar', id, date] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

//////////////////////////////////////////////

export function useStatusCancelMeeting() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: statusCancelMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cancelMeeting'] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export const useFetchShowWatingList = ({ id, rowId, date }: { id: string; rowId: string; date: string | null }) => {
  return useQuery({
    queryKey: ['watingList', id, date],
    enabled: !!rowId && !!id,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/institution/${id}/meeting/core/consultation-meeting/${rowId}/meeting-waiting-list`
      )
      return res.data?.data
    }
  })
}

export function useCreateWatingList() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId, date }: any) => watingListMeeting({ data, id, rowId, date }),
    onSuccess: (_, variables) => {
      const { id, date } = variables
      queryClient.invalidateQueries({ queryKey: ['watingList', id, date] })
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteWatingList() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteWatingList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watingList'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
