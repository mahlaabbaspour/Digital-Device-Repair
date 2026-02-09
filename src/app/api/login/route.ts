// Next Imports
import { NextResponse } from 'next/server'


export type UserTable = {
  id: number
  name: string
  email: string
  image: string
  password: string
}

// =============== Fake Data ============================

 const users: UserTable[] = [
  {
    id: 1,
    name: 'John Doe',
    password: 'admin',
    email: 'admin@vuexy.com',
    image: '/images/avatars/1.png'
  }
]

type ResponseUser = Omit<UserTable, 'password'>

export async function POST(req: Request) {
  // Vars
  const { email, password } = await req.json()
  const user = users.find((u : any) => u?.email === email && u.password === password)
  let response: null | ResponseUser = null

  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...filteredUserData } = user

    response = {
      ...filteredUserData
    }

    return NextResponse.json(response)
  } else {
    // We return 401 status code and error message if user is not found
    return NextResponse.json(
      {
        // We create object here to separate each error message for each field in case of multiple errors
        message: ['Email or Password is invalid']
      },
      {
        status: 401,
        statusText: 'Unauthorized Access'
      }
    )
  }
}
