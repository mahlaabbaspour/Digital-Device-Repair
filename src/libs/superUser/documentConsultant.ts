import axiosConfig from '../auth/axios'

export const fetchShowCalenderConsultation = async function (id: string) {
  try {
    const response = await axiosConfig.get(`/super-user/${id}/meeting/core/consultation-meeting/calender`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchShowMeet = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/super-user/${Data?.id}/meeting/core/consultation-meeting/show/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createCommandConsultant = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/super-user/${Data?.id}/meeting/core/consultation-meeting/command/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
