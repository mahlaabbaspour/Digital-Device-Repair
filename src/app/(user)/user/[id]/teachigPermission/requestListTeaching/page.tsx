import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestListTeachingTable from '@/components/pages/user/teachigPermission/RequestListTeachingTable'

export const metadata = {
  title: 'فهرست درخواست های تدریس',
  description: 'می توانید فهرست درخواست های تدریس را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست درخواست های تدریس'
  }
]

export default async function TeachingPermissionPage({ params }: any) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <RequestListTeachingTable id={id} />
    </>
  )
}
