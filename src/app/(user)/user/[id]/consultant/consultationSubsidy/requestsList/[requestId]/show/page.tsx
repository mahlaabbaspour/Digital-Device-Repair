import Breadcrumb from '@/components/elements/Breadcrumb'
import CardRequestShowUser from '@/components/pages/user/consultationSubsidy/ShowRequestUserForm'
import { fetchShowDataConsultationSubsidy, fetchUpsertDataConsultationSubsidy } from '@/libs/user/consultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function CreateRuequstListPage({ params }: any) {
  const { id, requestId } = await params
  const data = await fetchUpsertDataConsultationSubsidy(id)
  const show = await fetchShowDataConsultationSubsidy({ id, requestId })
  console.log(show, 'sohow')

  const items = [
    {
      title: 'فهرست پرونده ها',
      to: `/user/${id}/consultant/consultationSubsidy/requestsList`
    },
    {
      title: `مشاهده درخواست (${show?.name})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardRequestShowUser data={data} id={id} show={show} />
    </>
  )
}
