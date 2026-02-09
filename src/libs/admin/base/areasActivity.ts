import axiosConfig from "@/libs/auth/axios";

export const createAreasActivity = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/activity-field/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateAreasActivity = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/activity-field/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
