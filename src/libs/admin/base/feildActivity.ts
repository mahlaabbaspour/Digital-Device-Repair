import axiosConfig from "@/libs/auth/axios";

export const createFieldActivity = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/activity-field/${formData.id}/activity-field-area/store`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateFieldActivity = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/activity-field/${formData.id}/activity-field-area/update/${formData?.rowId}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
