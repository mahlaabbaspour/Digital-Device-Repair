import axiosConfig from '@/libs/auth/axios'

export const fetchShowCalendar = async function (Data: any) {
  try {
    const response = await axiosConfig.get(`/institution/${Data?.id}/meeting/core/consultation-meeting/calender`, {
      nextContext: true,
      params: {
        date: Data?.date
      }
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchUpsertDataCalendar = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createCheckCalendar = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/check-time-conflict`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const createCheckSingleCalendar = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/check-single-conflict`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const createCalendar = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/store-batch`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const createSingleMeetingCalender = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/store`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateSingleMeetingCalender = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/update/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteSinglMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/destroy/${Data?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const showMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/show/${Data?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const reserveMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/reserve-meeting`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const paymentMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/update-payment/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const cancelMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/cancel-meeting/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const statusCancelMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/meeting/core/cancelled-meeting/update/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchShowCancelMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${Data?.id}/meeting/core/cancelled-meeting/show/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

//////////////////////////watingList///////////////////////////

export const watingListMeeting = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/${Data?.rowId}/meeting-waiting-list/store`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteWatingList = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/meeting/core/consultation-meeting/${Data?.rowId}/meeting-waiting-list/destroy/${Data?.waitId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
