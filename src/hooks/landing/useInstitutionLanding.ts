import axiosConfig from '@/libs/auth/axios'
import {
  createDocumentInstitution,
  createReserverInstitution,
  createWatingListInstitution,
  deleteWatingListInstitution
} from '@/libs/landing/institutionLanding'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const BASE_INSTITUTION_LANDING = 'http://192.168.1.106:96/api'

export const useFetchInstitutionLanding = (params: any) => {
  return useQuery({
    queryKey: ['institutionLandig', params],
    queryFn: async () => {
      const res = await axios.get(`${BASE_INSTITUTION_LANDING}/landing/consulting-institution/core/institution`, {
        params: params
      })
      return res.data?.data
    }
  })
}

export const useFetchCourseInstitutionLanding = (params: any) => {
  return useQuery({
    queryKey: ['institutionLandig', params],
    queryFn: async () => {
      const res = await axios.get(`${BASE_INSTITUTION_LANDING}/landing/education-institution/core/institution`, {
        params: params
      })
      return res.data?.data
    }
  })
}

export const useFetchInstitutionCalender = ({ params, id }: any) => {
  console.log(params, 'params')
  return useQuery({
    queryKey: ['institutionLandigCalender', params],
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/landing/consulting-institution/core/institution/${id}/meeting/consultation-meeting/calender`,
        {
          params: params
        }
      )
      return res.data?.data
    }
  })
}

export function useReserveMeetingInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createReserverInstitution({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { params } = variables
      queryClient.invalidateQueries({ queryKey: ['institutionLandigCalender', params] })
      // toast.success('با موفقیت انجام شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useWatingListMeetingInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => createWatingListInstitution({ data, id, rowId }),
    onSuccess: (_, variables) => {
      const { params } = variables
      queryClient.invalidateQueries({ queryKey: ['institutionLandigCalender', params] })
      // toast.success('با موفقیت انجام شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}

export function useDeleteWatingListMeetingInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, meetingId, rowId }: any) => deleteWatingListInstitution({ id, meetingId, rowId }),
    onSuccess: (_, variables) => {
      const { params } = variables
      queryClient.invalidateQueries({ queryKey: ['institutionLandigCalender', params] })
      // toast.success('با موفقیت انجام شد')
    }
    // onError: error => {
    //   toast.error('خطایی رخ داد')
    //   throw error
    // }
  })

  return { mutateAsync, isPending }
}
/////////////////////Document for Reservistion/////////////////////

export const useFetchInstitutionDocument = ({ id, enabled }: any) => {
  return useQuery({
    queryKey: ['institutionDocument', id],
    queryFn: async () => {
      const res = await axiosConfig.get(`/landing/consulting-institution/core/institution/${id}/consultation-document/`)
      return res.data?.data
    },
    enabled: enabled
  })
}

export function useCreateDocumentInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id }: any) => createDocumentInstitution(id),
    onSuccess: (_, variables) => {
      const { id } = variables
      queryClient.invalidateQueries({ queryKey: ['institutionDocument', id] })
    }
  })

  return { mutateAsync, isPending }
}
