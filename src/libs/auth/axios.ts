import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { authOptions } from './auth'
import https from 'https'

declare module 'axios' {
  interface AxiosRequestConfig {
    nextContext?: GetServerSidePropsContext | boolean
    skipErrorHandling?: boolean
  }
}

const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

const axiosConfig = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

// Helper function to get the token dynamically
const getToken = async (context?: GetServerSidePropsContext | boolean) => {
  if (context) {
    // Server-side: Use getServerSession

    const session: any = await getServerSession(authOptions)
    return session?.myToken
  } else {
    // Client-side: Use getSession
    const session: any = await getSession()

    return session?.myToken
  }
}

// Add an interceptor to attach the token to every request
axiosConfig.interceptors.request.use(
  async config => {
    const token = await getToken(config.nextContext)
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosConfig
