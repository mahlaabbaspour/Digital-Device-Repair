import axiosConfig from "@/libs/auth/axios";

export const createLanguage = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/language/store`, formData)
         const data = response.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateLanguage = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/language/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
