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

// //ایندکس فهرستی جلسات
// export const useFetchMeetingConsultation = (Data: any) => {
//   const params = Data?.params
//   return useQuery({
//     queryKey: ['meetingConsultation'],
//     queryFn: async () => {
//       const res = await axiosConfig.get(`/institution/${Data?.id}/meeting/core/consultation-meeting`, {
//         params: params
//       })
//       return res.data?.data
//     }
//   })
// }

export const useFetchMeetingConsultation = ({ id }: any) => {
  return useQuery({
    queryKey: ['meetingConsultation'],
    queryFn: async () => {
      const res = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting`)
      return res.data?.data
    }
  })
}

////ایجاد جلسه تکی
export function useCreateSingleMeetingCalenderConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSingleMeetingCalender,
    onSuccess: (_, variables) => {
      const { params, id } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation', id] })
      // toast.success('با موفقیت ایجاد شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

//چک کردن تداخل جلسات تکی
export function useCreateCheckSingleClanderConsultation() {
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

///چک کردن تداخل جلسات گروهی
export function useCreateCheckClanderGroupConsultation() {
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

////ایجاد جلسات گروهی
export function useCreateCalenderGroupConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCalendar,
    onSuccess: (_, variables) => {
      const { params, id } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation'] })
      // toast.success('با موفقیت ایجاد شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

////رزرو کردن جلسه
export function useReserveMeetingConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => reserveMeeting({ data, id }),
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation', id] })
      // toast.success('با موفقیت انجام شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

///نمایش جلسات در صف انتظار
export function useFetchShowWatingListConsultationConsultation({
  id,
  rowId,
  params
}: {
  id: string
  rowId: string
  params: any
}) {
  return useQuery({
    queryKey: ['meetingConsultation'],
    enabled: !!rowId && !!id,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/institution/${id}/meeting/core/consultation-meeting/${rowId}/meeting-waiting-list`
      )
      return res.data?.data
    }
  })
}

//ایجاد جلسه در صف انتظار
export function useCreateWatingListConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => watingListMeeting({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { id, params } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation'] })
    }
  })

  return { mutateAsync, isPending }
}

///حذف جلسه موجود در صف انتطار
export function useDeleteWatingListConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteWatingList,
    onSuccess: (_, variables) => {
      const { id, params } = variables
      console.log(params, 'params')
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///کنسل کردن جلسه
export function useCancelMeetingConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, rowId }: any) => cancelMeeting({ id, rowId }),
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation', id] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function usePaymentMeetingConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => paymentMeeting({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation', id] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateSingleMeetingCalenderConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSingleMeetingCalender,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation'] })
      // toast.success('با موفقیت ایجاد شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useDeleteSingleMeetingConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteSinglMeeting,
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation', id] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

//////////////////////////////////////////////

export function useStatusCancelMeetingConsultationConsultation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: statusCancelMeeting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetingConsultation'] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
