import axiosConfig from '@/libs/auth/axios'

export const fetchShowProfile = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/institution/${id}/membership/core/institution/show`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateProfile = async function (Data: any) {
  try {
    const createData = Data?.data
    const formData = new FormData()

    function appendFormData(fd: FormData, data: any, parentKey = '') {
      if (data === null || data === undefined) return

      if (data instanceof File || data instanceof Blob) {
        fd.append(parentKey, data)
        return
      }

      if (Array.isArray(data)) {
        data.forEach((value, index) => {
          const key = parentKey ? `${parentKey}[${index}]` : `${index}`
          appendFormData(fd, value, key)
        })
        return
      }

      if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
          const fullKey = parentKey ? `${parentKey}[${key}]` : key
          appendFormData(fd, data[key], fullKey)
        })
        return
      }

      fd.append(parentKey, data)
    }

    appendFormData(formData, createData)
    formData.append('_method', 'put')

    const response = await axiosConfig.post(`/institution/${Data?.id}/membership/core/profile/update`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data?.data
  } catch (error) {
    throw error
  }
}
