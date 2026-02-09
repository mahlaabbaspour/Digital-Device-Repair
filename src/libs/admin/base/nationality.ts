import axiosConfig from "@/libs/auth/axios";

export const createNationality = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/nationality/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateNationality = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/nationality/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
