import axiosConfig from '@/libs/auth/axios'

export const fetchTeachingPermissionRevisionShow = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/organization/${Data?.id}/education/request-teaching-permission/core/request-teaching-permission/show/${Data?.revisionId}`,
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

export const updateTeachingPermissionRevision = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${Data?.id}/education/request-teaching-permission/core/request-teaching-permission/update/${Data?.revisionId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const processObjectionTeachingPermissionReject = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${Data?.id}/education/request-teaching-permission/core/request-teaching-permission/process-objection/${Data?.revisionId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

/////////History Study

export const updateHistoryStudyRevisionTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.revisionId}/study-history/update/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////History Education

export const updateHistoryEducationRevisionTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.revisionId}/education-history/update/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////History Teaching

export const updateHistoryTeachingRevisionTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.revisionId}/teaching-history/update/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////History Composing

export const updateHistoryComposingRevisionTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.revisionId}/composing-history/update/${fromData?.rowId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
