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

export const fetchInstitutionLandingUpsertData = async function () {
  try {
    const response = await axios.get(
      `http://192.168.1.106:96/api/landing/education-institution/institution/core/institution/upsert-data`
    )
    const data = response.data?.data

    return data
  } catch (error) {
    throw error
  }
}
