
import axiosConfig from "@/libs/auth/axios";

export const fetchServiceRecipient = async function () {
    try {
         const response = await axiosConfig.get(`/admin/base/service-recipient-type`, {
            nextContext: true
         })
         const data = response.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}



export const createServiceRecipient = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/service-recipient-type/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateServiceRecipient = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/service-recipient-type/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const deleteServiceRecipient = async function (id : any) {
    try {
         const response = await axiosConfig.delete(`/admin/base/service-recipient-type/destroy/${id}`)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
