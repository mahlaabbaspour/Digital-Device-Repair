import axiosConfig from "@/libs/auth/axios";

export const fetchAdminShow = async function (id: string) {
    try {
         const response = await axiosConfig.get(`/admin/membership/core/real-person/admin/show/${id}`, {
            nextContext: true
         })
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
