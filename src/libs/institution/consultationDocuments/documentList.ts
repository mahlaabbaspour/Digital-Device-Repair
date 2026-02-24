import axiosConfig from '@/libs/auth/axios'

export const createUserInstitution = async function (fromData: any) {
  try {
    const response = await axiosConfig.post(`/institution/${fromData?.id}/user/core/user/store`, fromData?.data)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchDocumentUpsertData = async function (id: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${id}/inPerson-consultation/core/inPerson-consultation/upsert-data`,
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

export const createConsultationDocuments = async function (fromData: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${fromData?.id}/inPerson-consultation/core/inPerson-consultation/store`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateConsultationDocuments = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${fromData?.id}/inPerson-consultation/core/inPerson-consultation/update/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchShowConsultationDocuments = async function (fromData: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${fromData?.id}/inPerson-consultation/core/inPerson-consultation/show/${fromData?.rowId}`,
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

export const changeStatusDocument = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${fromData?.id}/inPerson-consultation/core/inPerson-consultation/change-status/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////////Dignosis and meeting

export const fetchShowDiagnosisAndMeeting = async function (fromData: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${fromData?.id}/inPerson-consultation/core/inPerson-consultation/show/${fromData?.documentId}`,
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

export const createSupervisorComment = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${fromData?.id}/meeting/core/consultation-meeting/supervisor-comment/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////////

///Diagnosis document institution

export const updateDiagnosisAndDocumentInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/inPerson-consultation/core/inPerson-consultation/update-consultation/${Data?.documentId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

///////
export const fetchListMeeting = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting/`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchUpsertDataMeeting = async function (id: any) {
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
