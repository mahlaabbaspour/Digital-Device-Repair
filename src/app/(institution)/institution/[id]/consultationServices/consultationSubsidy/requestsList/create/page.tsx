import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestFormInstitutionCreate from '@/components/pages/institution/consultationSubsidy/CreateRequestInstitutionForm'
import { fetchConsultationSubsidyUpsertData } from '@/libs/institution/consultationServices/consultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

export default async function CreateRuequstListPage({ params }: any) {
  const { id } = await params
  const data = await fetchConsultationSubsidyUpsertData(id)

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
      <RequestFormInstitutionCreate id={id} data={data} />
    </>
  )
}
