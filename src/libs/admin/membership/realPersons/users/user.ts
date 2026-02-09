import axiosConfig from '@/libs/auth/axios'

export const fetchUserUpsertData = async function () {
  try {
    const response = await axiosConfig.get(`/admin/membership/core/real-person/user/upsert-data`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createUser = async function (Data: any) {
  try {
    const formData = new FormData()
    Object.keys(Data).forEach(key => {
      if (Array.isArray(Data[key])) {
        Data[key].forEach((item: any, index: number) => {
          formData.append(`${key}[${index}]`, item)
        })
      } else {
        formData.append(key, Data[key] ?? '')
      }
    })
    const response = await axiosConfig.post(`/admin/membership/core/real-person/user/store`, formData)
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const updateUser = async function (fromData: any) {
  try {
    const response = await axiosConfig.put(
      `/admin/membership/core/real-person/user/update/${fromData?.id}`,
      fromData?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchshowUser = async function (id: any) {
  try {
    const response = await axiosConfig.get(`/admin/membership/core/real-person/user/show/${id}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
