import Breadcrumb from '@/components/elements/Breadcrumb'
import TeachingPermissionConfirmedTable from '@/components/pages/organization/teachigPermission/confirmedTable'

export const metadata = {
  title: 'فهرست درخواست های تایید شده',
  description: 'می توانید فهرست درخواست های تایید شده را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست درخواست های تایید شده'
  }
]

export default async function TeachingPermissionPage({ params }: any) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <TeachingPermissionConfirmedTable id={id} />
    </>
  )
}
