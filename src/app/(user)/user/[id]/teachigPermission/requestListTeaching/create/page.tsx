import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestCreateForm from '@/components/pages/user/teachigPermission/RequestListCreateForm'
import { fetchTeachingPermissionUpsertData } from '@/libs/user/teachigPermission'

export const metadata = {
  title: 'ایجاد درخواست تدریس',
  descritpion: 'می توانید مجوز تدریس مورد نظر را ایجاد کنید'
}

export default async function CreateTeachingPermissionPage({ params }: any) {
  const { id } = await params
  const upsertData = await fetchTeachingPermissionUpsertData(id)

  const items = [
    {
      title: 'فهرست مجوز تدریس ها',
      to: `/user/${id}/teachigPermission/requestListTeaching`
    },
    {
      title: 'ایجاد مجوز تدریس'
    }
  ]
  return (
    <>
      <Breadcrumb items={items} />
      <RequestCreateForm upsertData={upsertData} id={id} />
    </>
  )
}
