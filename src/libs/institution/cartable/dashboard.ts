import axiosConfig from '@/libs/auth/axios'

export const fetchDataDashboardInstitution = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/cartable/dashboard/`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
