import Breadcrumb from '@/components/elements/Breadcrumb'
import RevisionForm from '@/components/pages/organization/teachigPermission/RevisionForm'
import { fetchTeachingPermissionRevisionShow } from '@/libs/organization/teachigPermission/revision'

export const metadata = {
  title: 'بررسی درخواست',
  description: 'می توانید درخواست مورد نظر را بررسی کنید'
}

export default async function RevisionFormPage({ params }: any) {
  const { id, revisionId } = await params
  const show = await fetchTeachingPermissionRevisionShow({ id, revisionId })

  const items = [
    {
      title: 'فهرست درخواست های در دست بررسی',
      to: `/organization/${id}/teachigPermission/requestListRevision`
    },
    {
      title: 'بررسی درخواست'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <RevisionForm id={id} revisionId={revisionId} show={show} />
    </>
  )
}
