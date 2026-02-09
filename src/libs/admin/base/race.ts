import axiosConfig from "@/libs/auth/axios";

export const createRace = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/race/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateRace = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/race/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
