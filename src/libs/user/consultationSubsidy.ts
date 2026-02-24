import axiosConfig from '../auth/axios'

export const fetchShowConsultationSubsidy = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/core/consultation-document/index-open`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchUpsertDataConsultationSubsidy = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/consultation-subsidy/core/consultation-subsidy/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchShowDataConsultationSubsidy = async function ({ id, requestId }: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${id}/consultation-subsidy/core/consultation-subsidy/show/${requestId}`,
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

export const createConsultationSubsidy = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/user/${Data?.id}/consultation-subsidy/core/consultation-subsidy/store`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
