import axiosConfig from "@/libs/auth/axios";

export const createMarital = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/marital/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateMarital = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/marital/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
