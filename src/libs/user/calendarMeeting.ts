import axiosConfig from '../auth/axios'

export const fetchInstitutionCalender = async function (id: string) {
  try {
    const response = await axiosConfig.get(`/user/${id}/meeting/core/consultation-meeting/calender-institution`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
