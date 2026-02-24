import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestFormCreate from '@/components/pages/user/consultationSubsidy/CreateRequestForm'
import { fetchShowConsultationSubsidy, fetchUpsertDataConsultationSubsidy } from '@/libs/user/consultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function CreateRuequstListPage({ params }: any) {
  const { id } = await params
  const show = await fetchShowConsultationSubsidy(id)
  const data = await fetchUpsertDataConsultationSubsidy(id)

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
      <RequestFormCreate show={show} id={id} data={data} />
    </>
  )
}
