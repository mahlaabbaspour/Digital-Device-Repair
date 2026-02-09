import axiosConfig from '../auth/axios'

export const fetchShowCalendarUser = async function (id: string) {
  try {
    const response = await axiosConfig.get(`/user/${id}/meeting/core/consultation-meeting/calender`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchShowMeetUser = async function (Data: any) {
  try {
    const response = await axiosConfig.get(`/user/${Data?.id}/meeting/core/consultation-meeting/show/${Data?.rowId}`)
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
