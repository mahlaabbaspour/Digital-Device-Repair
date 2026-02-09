import axiosConfig from "@/libs/auth/axios";

export const fetchRegions = async function () {
    try {
         const response = await axiosConfig.get(`/admin/base/region`, {
            nextContext: true
         })
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}
