import axiosConfig from '../auth/axios'

export const createCommentConsultant = async function (fromData: any) {
  try {
    const formData = new FormData()

    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
      }
    })
    const response = await axiosConfig.post(
      `/advisor/${fromData?.id}/core/inPerson-consultation/${fromData?.rowId}/comment/store`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateCommentConsultant = async function (fromData: any) {
  try {
    const formData = new FormData()

    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/advisor/${fromData?.id}/core/inPerson-consultation/${fromData?.rowId}/comment/update/${fromData?.commentId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteCommentConsultant = async function (fromData: any) {
  try {
    const response = await axiosConfig.delete(
      `/advisor/${fromData?.id}/core/inPerson-consultation/${fromData?.rowId}/comment/destroy/${fromData?.commentId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
