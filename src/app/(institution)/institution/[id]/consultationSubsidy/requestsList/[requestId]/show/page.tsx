import Breadcrumb from '@/components/elements/Breadcrumb'
import CardRequestShowInstitution from '@/components/pages/institution/consultationSubsidy/ShowRequestInstitutionForm'
import {
  fetchConsultationSubsidyShow,
  fetchConsultationSubsidyUpsertData
} from '@/libs/institution/consultationServices/consultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function CreateRuequstListPage({ params }: any) {
  const { id, requestId } = await params
  const data = await fetchConsultationSubsidyUpsertData(id)
  const show = await fetchConsultationSubsidyShow({ id, requestId })

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
      <CardRequestShowInstitution data={data} id={id} show={show} />
    </>
  )
}
