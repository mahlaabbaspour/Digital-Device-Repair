import Breadcrumb from '@/components/elements/Breadcrumb'
import CommentUser from '@/components/pages/user/userDocuments/CommentDocumetUser'

export const metadata = {
  title: 'چت',
  description: 'می توانید چت را مشاهده کنید'
}

export default async function DocumentCommentUser({ params, searchParams }: any) {
  const { id, documentId } = await params
  const resolvedSearchParams = await searchParams
  const advisorId = resolvedSearchParams?.advisorId

  const items = [
    {
      title: 'فهرست پرونده ها',
      to: `/superUser/${id}/consultant/consultantDocument`
    },
    {
      title: 'چت'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CommentUser id={id} documentId={documentId} advisorId={advisorId} />
    </>
  )
}
