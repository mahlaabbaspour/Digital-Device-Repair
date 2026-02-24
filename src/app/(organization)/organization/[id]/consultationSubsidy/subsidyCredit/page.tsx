import Breadcrumb from '@/components/elements/Breadcrumb'
import SubsidyCreditTable from '@/components/pages/organization/subsidyCredit/TableSubsidyCredit'

export const metadata = {
  title: 'فهرست درانتظار تایید',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست اعتبارات یارانه'
  }
]

export default async function EvaluationListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <>
      <Breadcrumb items={items} />
      <SubsidyCreditTable id={id} />
    </>
  )
}
