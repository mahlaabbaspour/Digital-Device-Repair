import axiosConfig from '@/libs/auth/axios'

export const fetchInstitution1480UpsertData = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/super-user/${id}/meeting-1480/core/meeting-1480/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitution1480Show = async function ({ id, meetingId }: any) {
  try {
    const response = await axiosConfig.get(`/super-user/${id}/meeting-1480/core/meeting-1480/show/${meetingId}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createMeetingAndDiagnosisInstitution1480 = async function (Data: any) {
  try {
    const response = await axiosConfig.post(`/super-user/${Data?.id}/meeting-1480/core/meeting-1480/store`, Data?.data)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateMeetingAndDiagnosisInstitution1480 = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/super-user/${Data?.id}/meeting-1480/core/meeting-1480/update/${Data?.meetingId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
