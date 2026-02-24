import axiosConfig from '../auth/axios'

export const fetchInstitutionCalender = async function ({ id, institutionId }: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/meeting/core/consultation-meeting/calender-institution`, {
      params: {
        institution_id: institutionId
      },
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchShowInstitutionCalenderConsultation = async function ({ id, institutionId }: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/institution/core/institution/show`, {
      params: {
        institution_id: institutionId
      },
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionCalenderUpsertData = async function ({ id, institutionId }: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/meeting/core/consultation-meeting/upsert-date`, {
      params: {
        institution_id: institutionId
      },
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createReserverMeetingConsultationUser = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/user/${Data?.id}/meeting/core/consultation-meeting/reserve-meeting/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteReserveMeetingConsultationUser = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/user/${Data?.id}/meeting/core/consultation-meeting/cancel-meeting/${Data?.meetingId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const createDocumentConsultationUser = async function ({ id, institutionId }: any) {
  try {
    const Data = {
      institution_id: institutionId
    }
    const response = await axiosConfig.post(`/user/${id}/core/inPerson-consultation/store`, Data)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteWatingListMeetingConsultationUser = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/user/${Data?.id}/meeting/core/consultation-meeting/${Data?.meetingId}/meeting-waiting-list/destroy/${Data?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchPersonWatingListMeetingConsultationUser = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${Data?.id}/meeting/core/consultation-meeting/${Data?.rowId}/meeting-waiting-list/check-user-waiting-list`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const createWatingListMeetingConsultaionUser = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/user/${Data?.id}/meeting/core/consultation-meeting/${Data?.rowId}/meeting-waiting-list/store`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
