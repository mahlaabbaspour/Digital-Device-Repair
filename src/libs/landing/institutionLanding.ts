import axios from 'axios'
import axiosConfig from '../auth/axios'

export const fetchInstitutionShow = async function (id: string) {
  try {
    const response = await axiosConfig.get(`/landing/consulting-institution/core/institution/show/${id}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionAdvisor = async function (id: string) {
  try {
    const response = await axiosConfig.get(`/landing/consulting-institution/core/institution/advisor/${id}`, {
      nextContext: true
    })
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionActiviyField = async function (id: string) {
  try {
    const response = await axiosConfig.get(
      `/landing/consulting-institution/core/institution/consulting-activity-field-area/${id}`,
      {
        nextContext: true
      }
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionDocument = async function (id: string) {
  try {
    const response = await axiosConfig.get(
      `/landing/consulting-institution/core/institution/${id}/inPerson-consultation/`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createReserverInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.put(
      `/landing/consulting-institution/core/institution/${Data?.id}/meeting/consultation-meeting/reserve-meeting/${Data?.rowId}`,
      Data?.data
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createDocumentInstitution = async function (id: any) {
  try {
    const response = await axiosConfig.post(
      `/landing/consulting-institution/core/institution/${id}/inPerson-consultation/store`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchWatingListInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.get(
      `/landing/consulting-institution/core/institution/${Data?.id}/meeting/consultation-meeting/${Data?.rowId}/meeting-waiting-list/check-user-waiting-list`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const fetchInstitutionLandingUpsertData = async function () {
  try {
    const response = await axios.get(
      `http://192.168.1.106:96/api/landing/education-institution/core/institution/upsert-data`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}

export const createWatingListInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.post(
      `/landing/consulting-institution/core/institution/${Data?.id}/meeting/consultation-meeting/${Data?.rowId}/meeting-waiting-list/store`,
      Data?.data
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}

export const deleteWatingListInstitution = async function (Data: any) {
  try {
    const response = await axiosConfig.delete(
      `/landing/consulting-institution/core/institution/${Data?.id}/meeting/consultation-meeting/${Data?.meetingId}/meeting-waiting-list/destroy/${Data?.rowId}`
    )
    const data = response.data

    return data
  } catch (error) {
    throw error
  }
}
