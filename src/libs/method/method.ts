import { api } from '../api'

export async function fetchOptionsSelect(url: string, search: string) {
  try {
    const response = await api.get(url, {
      params: { search }
    })

    const data = response.data?.data ?? []

    return data
  } catch (error) {
    throw error
  }
}
