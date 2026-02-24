import axiosConfig from '@/libs/auth/axios'

export const createSubsidyCredit = async function (formData: any) {
  try {
    const response = await axiosConfig.post(`/organization/${formData?.id}/credit/core/credit/store`, formData?.data)
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateSubsidyCredit = async function (formData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${formData?.id}/credit/core/credit/update/${formData?.rowId}`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

//////////////////////CreditAllocations //////////

export const fetchShowCreditAllocation = async function ({ id, creditId }: any) {
  try {
    const response = await axiosConfig.get(`/organization/${id}/credit/core/credit/show/${creditId}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchIndexCreditAllocation = async function ({ id, creditId }: any) {
  try {
    const response = await axiosConfig.get(
      `/organization/${id}/credit/core/credit/${creditId}/credit-allocation
      `,
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

export const createCreditAllocation = async function (formData: any) {
  try {
    const response = await axiosConfig.post(
      `/organization/${formData?.id}/credit/core/credit/${formData?.creditId}/credit-allocation/store`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateCreditAllocation = async function (formData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${formData?.id}/credit/core/credit/${formData?.creditId}/credit-allocation/update/${formData?.rowId}`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
