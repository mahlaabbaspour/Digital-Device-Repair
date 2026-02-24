import axiosConfig from '@/libs/auth/axios'
import { useQuery } from '@tanstack/react-query'

export const useFetchDataDashboardOrganization = ({ params, id }: any) => {
  return useQuery({
    queryKey: ['documentConsultation', params],
    queryFn: async () => {
      const res = await axiosConfig.get(`/organization/${id}/cartable/dashboard/`, {
        params: params
      })
      return res.data?.data
    }
  })
}
