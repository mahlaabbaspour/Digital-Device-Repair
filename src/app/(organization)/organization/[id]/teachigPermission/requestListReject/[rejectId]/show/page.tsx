import Breadcrumb from '@/components/elements/Breadcrumb'
import RejectForm from '@/components/pages/organization/teachigPermission/RejectForm'
import { fetchTeachingPermissionRevisionShow } from '@/libs/organization/teachigPermission/revision'

export const metadata = {
  title: 'مشاهده درخواست',
  description: 'می توانید درخواست مورد نظر را مشاهده کنید'
}

export default async function RevisionFormPage({ params }: any) {
  const { id, rejectId } = await params
  const show = await fetchTeachingPermissionRevisionShow({ id, revisionId: rejectId })

  const items = [
    {
      title: 'فهرست درخواست های رد شده',
      to: `/organization/${id}/teachigPermission/requestListReject`
    },
    {
      title: 'مشاهده درخواست'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <RejectForm id={id} revisionId={rejectId} show={show} />
    </>
  )
}
