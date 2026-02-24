import axiosConfig from '@/libs/auth/axios'
import { useQuery } from '@tanstack/react-query'

export const useFetchAllCoursEducational = ({ params, id }: any) => {
  return useQuery({
    queryKey: ['institutionLandig', params],
    queryFn: async () => {
      const res = await axiosConfig.get(`/user/${id}/education/course/core/course/index-by-institution`, {
        params: params
      })
      return res.data?.data
    }
  })
}
