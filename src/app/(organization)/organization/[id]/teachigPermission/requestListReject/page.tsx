import Breadcrumb from '@/components/elements/Breadcrumb'
import TeachingPermissionRejectTable from '@/components/pages/organization/teachigPermission/rejectTable'

export const metadata = {
  title: 'فهرست درخواست های رد شده',
  description: 'می توانید فهرست درخواست های تایید شده را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست درخواست های رد شده'
  }
]

export default async function TeachingPermissionPage({ params }: any) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <TeachingPermissionRejectTable id={id} />
    </>
  )
}
