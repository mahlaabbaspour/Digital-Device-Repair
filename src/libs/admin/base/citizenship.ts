import axiosConfig from "@/libs/auth/axios";

export const createCitizenship = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/citizenship/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateCitizenship = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/citizenship/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
