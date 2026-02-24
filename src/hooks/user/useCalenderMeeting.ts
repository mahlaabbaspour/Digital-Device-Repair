import axiosConfig from '@/libs/auth/axios'
import {
  createDocumentConsultationUser,
  createReserverMeetingConsultationUser,
  createWatingListMeetingConsultaionUser,
  deleteReserveMeetingConsultationUser,
  deleteWatingListMeetingConsultationUser
} from '@/libs/user/calendarMeeting'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useFetchInstitutionCalenderUser = ({ params, id }: any) => {
  const serializedParams = JSON.stringify(params)
  return useQuery({
    queryKey: ['institutionUserCalender', id, serializedParams],
    queryFn: async () => {
      const res = await axiosConfig.get(`/user/${id}/meeting/core/consultation-meeting/calender-institution`, {
        params: params
      })
      return res.data?.data
    }
  })
}

export function useReserveMeetingInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createReserverMeetingConsultationUser({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { params, id } = variables
      const serializedParams = JSON.stringify(params)
      queryClient.invalidateQueries({ queryKey: ['institutionUserCalender', id, serializedParams] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteReserveMeetingConsultationUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, meetingId }: any) => deleteReserveMeetingConsultationUser({ id, meetingId }),
    onSuccess: (_, variables) => {
      const { params, id } = variables
      const serializedParams = JSON.stringify(params)
      queryClient.invalidateQueries({ queryKey: ['institutionUserCalender', id, serializedParams] })
    }
  })

  return { mutateAsync, isPending }
}

export function useCreateWatingListMeetingUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createWatingListMeetingConsultaionUser({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { params, id } = variables
      const serializedParams = JSON.stringify(params)
      queryClient.invalidateQueries({ queryKey: ['institutionUserCalender', id, serializedParams] })
      toast.success('با موفقیت انجام شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteWatingListMeetingConsultationUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, meetingId, rowId }: any) => deleteWatingListMeetingConsultationUser({ id, meetingId, rowId }),
    onSuccess: (_, variables) => {
      const { params, id } = variables
      const serializedParams = JSON.stringify(params)
      queryClient.invalidateQueries({ queryKey: ['institutionUserCalender', id, serializedParams] })
      // toast.success('با موفقیت انجام شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export const useFetchDocumentConsultationUser = ({ id, institutionId, enabled }: any) => {
  return useQuery({
    queryKey: ['institutionDocument', id],
    queryFn: async () => {
      const res = await axiosConfig.get(`/user/${id}/core/inPerson-consultation/index-by-institution`, {
        params: {
          institution_id: institutionId
        }
      })
      return res.data?.data
    },
    enabled: enabled
  })
}

/////////////////////Document for Reservistion/////////////////////

export function useCreateDocumentConsultationUser() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, institutionId }: any) => createDocumentConsultationUser({ id, institutionId }),
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.invalidateQueries({ queryKey: ['institutionDocument', id] })
    }
  })

  return { mutateAsync, isPending }
}
