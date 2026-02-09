import axiosConfig from '@/libs/auth/axios'

export const fetchInstitution1480UpsertDataInstitution = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/meeting-1480/core/meeting-1480/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitution1480ShowInstitution = async function ({ id, meetingId }: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/meeting-1480/core/meeting-1480/show/${meetingId}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createMeetingAndDiagnosisInstitution1480Institution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(`/institution/${Data?.id}/meeting-1480/core/meeting-1480/store`, Data?.data)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateMeetingAndDiagnosisInstitution1480Institution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/meeting-1480/core/meeting-1480/update/${Data?.meetingId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
