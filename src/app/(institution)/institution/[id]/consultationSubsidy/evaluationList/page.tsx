import Breadcrumb from '@/components/elements/Breadcrumb'
import EvaluationInstitutionTable from '@/components/pages/institution/consultationSubsidy/TableEvaluation'

export const metadata = {
  title: 'فهرست درحال ارزیابی',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست در حال ارزیابی'
  }
]

export default async function EvaluationListPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <EvaluationInstitutionTable id={id} />
    </>
  )
}
