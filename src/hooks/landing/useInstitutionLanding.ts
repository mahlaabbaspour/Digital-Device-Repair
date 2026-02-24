import axiosConfig from '@/libs/auth/axios'
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
      const res = await axios.get(
        `${BASE_INSTITUTION_LANDING}/landing/education-institution/institution/core/institution`,
        {
          params: params
        }
      )
      return res.data?.data
    }
  })
}
