import axiosConfig from "../auth/axios"

export async function fetchOptionsSelect(url: string , search: string) {
    try {
        const response = await axiosConfig.get(url, {
            params: { search}
        })

        const data = response.data?.data

        return data;
        
    } catch (error) {
        throw error
    }
}
