import axiosConfig from "@/libs/auth/axios";

export const createRefferrerType = async function (formData : any) {
    try {
         const response = await axiosConfig.post(`/admin/base/referrer-type/store`, formData)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateRefferrerType = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/referrer-type/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
