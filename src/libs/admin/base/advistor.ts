import axiosConfig from "@/libs/auth/axios";

export const createAdvistor = async function (formData : any) {
    try {
        console.log(formData, 'testttttt')
         const response = await axiosConfig.post(`/admin/base/advisor/store`, formData)
         const data = response.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateAdvistor = async function (formData : any) {
    try {
         const response = await axiosConfig.put(`/admin/base/advisor/update/${formData?.id}`, formData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
