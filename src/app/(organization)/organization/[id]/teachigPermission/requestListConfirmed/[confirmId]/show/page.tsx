import Breadcrumb from '@/components/elements/Breadcrumb'
import ConfirmForm from '@/components/pages/organization/teachigPermission/ConfirmForm'
import { fetchTeachingPermissionRevisionShow } from '@/libs/organization/teachigPermission/revision'

export const metadata = {
  title: 'مشاهده درخواست',
  description: 'می توانید درخواست مورد نظر را مشاهده کنید'
}

export default async function RevisionFormPage({ params }: any) {
  const { id, confirmId } = await params
  const show = await fetchTeachingPermissionRevisionShow({ id, revisionId: confirmId })

  const items = [
    {
      title: 'فهرست درخواست تایید شده',
      to: `/organization/${id}/teachigPermission/requestListConfirmed`
    },
    {
      title: 'مشاهده درخواست'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <ConfirmForm id={id} revisionId={confirmId} show={show} />
    </>
  )
}
