import axiosConfig from '../auth/axios'

export const fetchEducationCourseShowUser = async function ({ id, courseId }: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/education/course/core/course/show/${courseId}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionShowCourseUser = async function ({ id, institutionId }: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/institution/core/institution/show`, {
      params: {
        institution_id: institutionId
      },
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionUpsertDataUser = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/user/${id}/education/course/core/course/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

///////SHOW RESOURCE ////////
export const fetchResourceShowCourseUser = async function ({ id, courseId, resourceId }: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${id}/education/course/core/course/${courseId}/resource/show/${resourceId}`,
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

export const createVoteResourceCourse = async function ({ id, courseId, resourceId, Data }: any) {
  try {
    const response = await axiosConfig.post(
      `/user/${id}/education/course/core/course/${courseId}/resource/${resourceId}/vote/store`,
      Data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

////////////////LOGINGG CLASS ONLINE //////

export const loginOnlineTrainingMeetingsCourseUser = async function ({ id, courseId, rowId }: any) {
  try {
    const response = await axiosConfig.post(
      `/user/${id}/education/course/core/course/${courseId}/online-training-meeting/join-online-meeting/${rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
