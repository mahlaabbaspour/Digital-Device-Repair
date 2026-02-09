import axiosConfig from '@/libs/auth/axios'

export const fetchConsultationSubsidyUpsertData = async function (id: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${id}/consultation-subsidy/core/consultation-subsidy/upsert-data`,
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

export const fetchEvaluationShow = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${Data?.id}/consultation-subsidy/core/consultation-subsidy/show/${Data?.evaluationId}`,
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

export const fetchEvaluationUpsertData = async function (id: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${id}/consultation-subsidy/core/consultation-subsidy/upsert-data`,
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

export const createConsultationSubsidyInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/consultation-subsidy/core/consultation-subsidy/store`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const createEvaluationInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/consultation-subsidy/core/consultation-subsidy/evaluate/${Data?.evaluationId}`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
