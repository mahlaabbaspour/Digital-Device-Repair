import Breadcrumb from '@/components/elements/Breadcrumb'
import CreateUserForm from '@/components/pages/admin/membership/realPersons/users/CardUserCreate'
import { fetchUserUpsertData } from '@/libs/admin/membership/realPersons/users/user'
import { Card, CardContent } from '@mui/material'

export const metadata = {
  title: 'ایجاد کاربر',
  description: 'می توانید کاربر جدید ایجاد کنید'
}

const items = [
  {
    title: 'فهرست کاربران',
    to: '/admin/membership/realPersons/users'
  },
  {
    title: 'ایجاد کاربر'
  }
]

export default async function UserCreatePage() {
  const upsertData = await fetchUserUpsertData()

  return (
    <>
      <Breadcrumb items={items} />
      <Card>
        <CardContent>
          <CreateUserForm upsertData={upsertData} />
        </CardContent>
      </Card>
    </>
  )
}
