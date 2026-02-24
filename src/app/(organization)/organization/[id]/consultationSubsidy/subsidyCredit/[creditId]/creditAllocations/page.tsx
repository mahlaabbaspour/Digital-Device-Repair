import Breadcrumb from '@/components/elements/Breadcrumb'
import CreditAllocationsCard from '@/components/pages/organization/subsidyCredit/CreditAllocationsTable'
import { fetchIndexCreditAllocation, fetchShowCreditAllocation } from '@/libs/organization/subsidyCredit/subsidyCredit'

export const metadata = {
  title: 'تخصیص اعتبار',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function EvaluationListPage({ params }: any) {
  const { id, creditId } = await params
  const show = await fetchShowCreditAllocation({ id, creditId })
  const data = await fetchIndexCreditAllocation({ id, creditId })

  const items = [
    {
      title: 'فهرست اعتبارات یارانه',
      to: `/organization/${id}/consultationSubsidy/subsidyCredit`
    },
    {
      title: `تخصیص اعتبار (${show?.title})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CreditAllocationsCard id={id} creditId={creditId} show={show} data={data} />
    </>
  )
}
