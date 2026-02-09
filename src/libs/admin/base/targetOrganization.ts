import axiosConfig from '@/libs/auth/axios'

export const createTargetOrganization = async function (formData: any) {
  try {
    const response = await axiosConfig.post(`/admin/base/locality-permission-activity/store`, formData)
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateTargetOrganization = async function (formData: any) {
  try {
    const response = await axiosConfig.put(
      `/admin/base/locality-permission-activity/update/${formData?.id}`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
