import Breadcrumb from '@/components/elements/Breadcrumb'
import PendingApprovalFormOrganization from '@/components/pages/organization/consultationServices/consultationSubsidy/PendingApprovalForm'
import {
  fetchEvaluationShowOrganization,
  fetchEvaluationUpsertDataOrganization
} from '@/libs/organization/consultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function PendingApprovalActionPage({ params }: any) {
  const { id, evaluationId } = await params
  const show = await fetchEvaluationShowOrganization({ id, evaluationId })
  const data = await fetchEvaluationUpsertDataOrganization(id)

  const items = [
    {
      title: 'فهرست پرونده ها',
      to: `/organization/${id}/consultationServices/consultationSubsidy/pendingApproval`
    },
    {
      title: 'ایجاد درخواست '
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <PendingApprovalFormOrganization id={id} show={show} data={data} evaluationId={evaluationId} />
    </>
  )
}
