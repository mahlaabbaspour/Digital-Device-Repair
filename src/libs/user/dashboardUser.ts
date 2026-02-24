import axiosConfig from '@/libs/auth/axios'

export const fetchDataDashboardUser = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/cartable/dashboard/`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
