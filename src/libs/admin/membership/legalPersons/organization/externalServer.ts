import axiosConfig from "@/libs/auth/axios";

export const createExternalStorage = async function (fromData: any) {
    try {
         const response = await axiosConfig.post(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/external-storage/store`, fromData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}

export const updateExternalStorage = async function (fromData: any) {
    try {
         const response = await axiosConfig.put(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/external-storage/update/${fromData?.rowId}`, fromData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const createSMSserver = async function (fromData: any) {
    try {
         const response = await axiosConfig.post(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/sms/store`, fromData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}

export const updateSMSserver = async function (fromData: any) {
    try {
         const response = await axiosConfig.put(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/sms/update/${fromData?.rowId}`, fromData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}




export const createClassOnlineServer = async function (fromData: any) {
    try {
         const response = await axiosConfig.post(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/online-class/store`, fromData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}


export const updateClassOnlineServer = async function (fromData: any) {
    try {
         const response = await axiosConfig.put(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/online-class/update/${fromData?.rowId}`, fromData?.data)
         const data = response.data?.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}



export const connectionTest = async function (fromData: any) {
    try {
         const response = await axiosConfig.get(`/admin/membership/core/legal-person/organization/${fromData?.id}/external-server/online-class/connection-test/${fromData?.rowId}`)
         const data = response.data
         
         return data;
        
    } catch (error) {
        throw error
    }
}

