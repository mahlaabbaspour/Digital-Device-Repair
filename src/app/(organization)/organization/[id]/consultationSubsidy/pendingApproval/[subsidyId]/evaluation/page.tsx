import Breadcrumb from '@/components/elements/Breadcrumb'
import PendingApprovalFormOrganization from '@/components/pages/organization/consultationServices/consultationSubsidy/PendingApprovalForm'
import {
  fetchEvaluationShowOrganization,
  fetchEvaluationUpsertDataOrganization
} from '@/libs/organization/consultationSubsidy'

export const metadata = {
  title: 'فهرست درانتظار تایید',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function EvaluationListPage({ params }: any) {
  const { id, subsidyId } = await params
  const show = await fetchEvaluationShowOrganization({ id, subsidyId })
  const data = await fetchEvaluationUpsertDataOrganization(id)

  const items = [
    {
      title: 'فهرست در انتظار تایید',
      to: `/organization/${id}/consultationSubsidy/pendingApproval`
    },
    {
      title: `تایید درخواست یارانه (${show?.name})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <PendingApprovalFormOrganization id={id} evaluationId={subsidyId} show={show} data={data} />
    </>
  )
}
