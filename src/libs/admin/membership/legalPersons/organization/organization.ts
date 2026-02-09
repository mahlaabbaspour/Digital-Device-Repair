import axiosConfig from "@/libs/auth/axios";

export const fetchOrganizationShow = async function (id: string) {
    try {
         const response = await axiosConfig.get(`/admin/membership/core/legal-person/organization/show/${id}`, {
            nextContext: true
         })
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
