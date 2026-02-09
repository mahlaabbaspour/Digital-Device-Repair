import axiosConfig from "@/libs/auth/axios";

export const createEmploymentStatus = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/employment-status/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateEmploymentStatus = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/employment-status/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
