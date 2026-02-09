import axiosConfig from '@/libs/auth/axios'

export const createConsultationSubsidyCriteria = async function (formData: any) {
  try {
    const response = await axiosConfig.post(`/admin/base/consultation-subsidy-criterion/store`, formData)
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateConsultationSubsidyCriteria = async function (formData: any) {
  try {
    const response = await axiosConfig.put(
      `/admin/base/consultation-subsidy-criterion/update/${formData?.id}`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
