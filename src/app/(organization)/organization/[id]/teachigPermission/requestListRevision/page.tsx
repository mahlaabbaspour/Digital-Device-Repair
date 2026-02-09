import Breadcrumb from '@/components/elements/Breadcrumb'
import TeachingPermissionCheckingTable from '@/components/pages/organization/teachigPermission/checkingTable'

export const metadata = {
  title: 'فهرست درخواست های در دست بررسی',
  description: 'می توانید فهرست درخواست های در دست بررسی را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست درخواست های در دست بررسی'
  }
]

export default async function TeachingPermissionPage({ params }: any) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <TeachingPermissionCheckingTable id={id} />
    </>
  )
}
