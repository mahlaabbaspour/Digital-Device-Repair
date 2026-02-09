import axiosConfig from "@/libs/auth/axios";

export const createEducation = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/education/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateEducation = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/education/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
