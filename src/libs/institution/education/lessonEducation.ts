import axiosConfig from '@/libs/auth/axios'

export const fetchLessonEducationalUpsertDataInstitution = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/education/course/core/course/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchLessonEducationalShowInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/institution/${Data?.id}/education/course/core/course/show/${Data?.rowId}`,
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

export const createLessonEducationalInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(`/institution/${Data?.id}/education/course/core/course/store`, Data?.data)
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateLessonEducationalInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/education/course/core/course/update/${Data?.courseId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

/////////////////////////

export const requestPermissionHoldCourse = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/education/course/core/course/event-permit-request/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

////////////////////////Chapter Course

export const createChapterCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/chapter/store`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateChapterCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/chapter/update/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteChapterCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/chapter/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

///////////////////////Resource Course /////////////////

export const createResourceCourseInstitution = async function (Data: any) {
  try {
    const formData = new FormData()
    Object.keys(Data?.data).forEach(key => {
      if (Array.isArray(Data?.data[key])) {
        Data?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, Data?.data[key] ?? '')
      }
    })
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/chapter/${Data?.chapterId}/resource/store`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateResourceCourseInstitution = async function (Data: any) {
  try {
    const formData = new FormData()
    Object.keys(Data?.data).forEach(key => {
      if (Array.isArray(Data?.data[key])) {
        Data?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, Data?.data[key] ?? '')
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/chapter/${Data?.chapterId}/resource/update/${Data?.rowId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteResourceCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/chapter/${Data?.chapterId}/resource/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

////////////////File Course

export const createFileCourseStudentInstitution = async function (Data: any) {
  try {
    const formData = new FormData()
    Object.keys(Data?.data).forEach(key => {
      if (Array.isArray(Data?.data[key])) {
        Data?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, Data?.data[key] ?? '')
      }
    })
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/file/store`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteFileCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/file/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

///////////////InPersonMeeting Course/////////////
export const createInPersonMeetingCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/in-person-training-meeting/store`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateInPersonMeetingCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/in-person-training-meeting/update/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteInPersonMeetingCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/in-person-training-meeting/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

/////////////OnlineMeeting Course//////////
export const createOnlineMeetingCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/online-training-meeting/store`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateOnlineMeetingCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/online-training-meeting/update/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteOnlineMeetingCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/online-training-meeting/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

/////////////ExamEducational Institution//////////
export const createExamCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/exam/store`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateExamCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/exam/update/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteExamCourseInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/exam/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

/////////////CourseStudent Institution//////////
export const createCourseStudentInstitution = async function (Data: any) {
  try {
    const formData = new FormData()
    Object.keys(Data?.data).forEach(key => {
      if (Array.isArray(Data?.data[key])) {
        Data?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, Data?.data[key] ?? '')
      }
    })
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/course-student/store`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateCourseStudentInstitution = async function (Data: any) {
  try {
    const formData = new FormData()
    Object.keys(Data?.data).forEach(key => {
      if (Array.isArray(Data?.data[key])) {
        Data?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, Data?.data[key] ?? '')
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/course-student/update/${Data?.rowId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteCourseStudentInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/institution/${Data?.id}/education/course/core/course/${Data?.courseId}/course-student/destroy/${Data?.rowId}`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const uploadExcelToServer = async (file: any) => {
  try {
    const formData = new FormData()
    formData.append('file', file.data)
    const response = await axiosConfig.post(
      `/institution/${file?.id}/education/course/core/course/${file?.courseId}/course-student/resolve-student`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    return response.data
  } catch (error) {
    throw error
  }
}
