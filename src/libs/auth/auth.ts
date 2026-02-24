import CredentialProvider from 'next-auth/providers/credentials'
import axiosConfig from './axios'

export const authOptions: any = {
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: { username: { label: 'Username', type: 'text' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        try {
          const response: any = await axiosConfig.post(`/auth/login`, {
            username: credentials?.username,
            password: credentials?.password
          })
          const userData: any = response?.data?.data

          if (userData?.token) {
            return {
              ...userData,
              apiToken: userData.token
            }
          } else {
            return { error: response?.message }
          }
        } catch (error) {
          return error
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 7
  },
  callbacks: {
    async session({ session, token }: any) {
      session.myToken = token.apiToken
      session.user = token

      return session
    },
    async signIn({ user }: any) {
      if (user?.error) {
        throw new Error(user?.error)
      }

      return true
    },
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update' && session?.user) {
        token.user = session.user
      }

      if (user) {
        const { ...restUser } = user

        return { ...token, ...restUser }
      }

      return token
    }
  },
  pages: {
    signIn: '/auth/login'
  }
}
