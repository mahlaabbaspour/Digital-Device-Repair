import axiosConfig from '../auth/axios'

export const fetchEvaluationShowOrganization = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/organization/${Data?.id}/core/consultation-subsidy/show/${Data?.evaluationId}`,
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

export const fetchEvaluationUpsertDataOrganization = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/organization/${id}/core/consultation-subsidy/upsert-data`, {
      nextContext: true
    })

    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createEvaluationOrganization = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${Data?.id}/core/consultation-subsidy/check/${Data?.evaluationId}`,
      Data?.data
    )

    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
