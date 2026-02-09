import Breadcrumb from '@/components/elements/Breadcrumb'
import Comment from '@/components/pages/institution/consultationDocuments/documentList/CommentDocument'

export const metadata = {
  title: 'چت',
  description: 'می توانید چت را مشاهده کنید'
}

export default async function DocumentComment({ params }: any) {
  const { id, documentId } = await params

  const items = [
    {
      title: 'فهرست پرونده های مرکز',
      to: `/institution/${id}/consultationDocuments/documentList`
    },
    {
      title: 'چت'
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <Comment />
    </>
  )
}
