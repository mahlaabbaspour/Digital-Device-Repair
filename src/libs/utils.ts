import axiosConfig from './auth/axios'

export const updateInfoOrganizationAndInstitutionActive = async function (Data: any) {
  try {
    const response = await axiosConfig.put(`/admin/membership/core/profile/update-info`, Data)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
