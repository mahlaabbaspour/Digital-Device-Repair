import axiosConfig from '@/libs/auth/axios'

export const fetchShowDocumentConsultationOrganization = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/organization/${Data?.id}/inPerson-consultation/core/inPerson-consultation/show/${Data?.documentId}`,
      {
        nextContext: true
      }
    )

    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

/////////////////Meeting Consultation/////////////////

export const fetchMeetingConsultationUpsertDataOrganization = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/organization/${id}/meeting/core/consultation-meeting/upsert-data`, {
      nextContext: true
    })

    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
