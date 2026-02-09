import axiosConfig from '../auth/axios'

export const fetchTeachingPermissionUpsertData = async function (id: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${id}/education/request-teaching-permission/core/request-teaching-permission/upsert-data`,
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

export const fetchTeachingPermissionShow = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${Data?.id}/education/request-teaching-permission/core/request-teaching-permission/show/${Data?.teachId}`,
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

export const createTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()

    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/store`,
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

export const updateTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()

    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/update/${fromData?.teachId}`,
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

export const objectionTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/objection/${fromData?.teachId}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

/////////History Study

export const fetchHistoryStudyTeachingPermissionUpsertData = async function (fromData: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/study-history/upsert-data`,
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

export const createHistoryStudyTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/study-history/store`,
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

export const updateHistoryStudyTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/study-history/update/${fromData?.rowId}`,
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

export const deleteHistoryStudyTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.delete(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/study-history/destroy/${fromData?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////History Education

export const fetchHistoryEducationTeachingPermissionUpsertData = async function (fromData: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/education-history/upsert-data`,
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

export const createHistoryEducationTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/education-history/store`,
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

export const updateHistoryEducationTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/education-history/update/${fromData?.rowId}`,
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

export const deleteHistoryEducationTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.delete(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/education-history/destroy/${fromData?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////History Teaching

export const fetchHistoryTeachingTeachingPermissionUpsertData = async function (fromData: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/teaching-history/upsert-data`,
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

export const createHistoryTeachingTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/teaching-history/store`,
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

export const updateHistoryTeachingTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/teaching-history/update/${fromData?.rowId}`,
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

export const deleteHistoryTeachingTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.delete(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/teaching-history/destroy/${fromData?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

////History Composing

export const fetchHistoryComposingTeachingPermissionUpsertData = async function (fromData: any) {
  try {
    const response = await axiosConfig.get(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/composing-history/upsert-data`,
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

export const createHistoryComposingTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/composing-history/store`,
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

export const updateHistoryComposingTeachingPermission = async function (fromData: any) {
  try {
    const formData = new FormData()
    Object.keys(fromData?.data).forEach(key => {
      if (Array.isArray(fromData?.data[key])) {
        fromData?.data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
          console.log(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, fromData?.data[key] ?? '')
        console.log(key, fromData?.data[key])
      }
    })
    formData.append('_method', 'put')
    const response = await axiosConfig.post(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/composing-history/update/${fromData?.rowId}`,
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

export const deleteHistoryComposingTeachingPermission = async function (fromData: any) {
  try {
    const response = await axiosConfig.delete(
      `/user/${fromData?.id}/education/request-teaching-permission/core/request-teaching-permission/${fromData?.teachId}/composing-history/destroy/${fromData?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
