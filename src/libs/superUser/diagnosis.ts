import axiosConfig from '../auth/axios'

export const fetchShowDiagnosisIndex = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/super-user/${Data?.id}/core/consultation-document/show/${Data?.documentId}`,
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

export const fetchShowDiagnosis = async function (Data: any) {
  try {
    console.log(Data, 'Data')
    const response = await axiosConfig.get(
      `/super-user/${Data?.id}/core/consultation-document/${Data?.documentId}/consultation-diagnosis/show/${Data?.diagnosisId}`,
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

export const updateDiagnosisAndDocument = async function (Data: any) {
  try {
    console.log(Data, 'Data')
    const response = await axiosConfig.put(
      `/super-user/${Data?.id}/core/consultation-document/update-consultation/${Data?.documentId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const changeStatusDocumentConsultant = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/super-user/${fromData?.id}/core/consultation-document/referral/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchDiagnosisShow = async function (Data: any) {
  try {
    console.log(Data, 'DATA')
    const response = await axiosConfig.get(
      `/super-user/${Data?.id}/core/consultation-document/${Data?.documentId}/consultation-diagnosis`,
      {
        params: {
          meeting_id: Data?.meetingId
        }
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
