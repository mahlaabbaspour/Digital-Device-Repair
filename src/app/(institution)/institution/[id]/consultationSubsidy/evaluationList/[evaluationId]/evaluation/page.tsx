import Breadcrumb from '@/components/elements/Breadcrumb'
import EvaluationFormInstitutionCreate from '@/components/pages/institution/consultationSubsidy/CreateEvaluationForm'
import {
  fetchEvaluationShow,
  fetchEvaluationUpsertData
} from '@/libs/institution/consultationServices/consultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function CreateRuequstListPage({ params }: any) {
  const { id, evaluationId } = await params
  const data = await fetchEvaluationUpsertData(id)
  const show = await fetchEvaluationShow({ id, evaluationId })

  const items = [
    {
      title: 'فهرست پرونده ها',
      to: `/user/${id}/consultant/consultationSubsidy/requestsList`
    },
    {
      title: 'ایجاد درخواست '
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <EvaluationFormInstitutionCreate id={id} data={data} show={show} evaluationId={evaluationId} />
    </>
  )
}
