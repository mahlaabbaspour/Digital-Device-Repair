import axiosConfig from '@/libs/auth/axios'

export const createLessonEducation = async function (formData: any) {
  try {
    const response = await axiosConfig.post(
      `/organization/${formData?.id}/education/lesson/core/lesson/store`,
      formData.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateLessonEducation = async function (formData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${formData?.id}/education/lesson/core/lesson/update/${formData?.courseId}`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchLessonEducationUpsertData = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/organization/${id}/education/lesson/core/lesson/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

//////////////coursePendingApproval

export const updateCourseStatusDetermination = async function (formData: any) {
  try {
    const response = await axiosConfig.put(
      `/organization/${formData?.id}/education/course/core/course/update/${formData?.rowId}`,
      formData?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
