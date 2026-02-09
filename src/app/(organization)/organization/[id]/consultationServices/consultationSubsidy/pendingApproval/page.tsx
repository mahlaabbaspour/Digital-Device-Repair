import Breadcrumb from '@/components/elements/Breadcrumb'
import PendingApprovalTable from '@/components/pages/organization/consultationServices/consultationSubsidy/PendingApprovalTable'

export const metadata = {
  title: 'فهرست درانتظار تایید',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست در انتظار تایید'
  }
]

export default async function EvaluationListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id, 'id')
  return (
    <>
      <Breadcrumb items={items} />
      <PendingApprovalTable id={id} />
    </>
  )
}
