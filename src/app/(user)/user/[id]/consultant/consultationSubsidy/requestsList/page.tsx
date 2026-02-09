import Breadcrumb from '@/components/elements/Breadcrumb'
import RequestListTable from '@/components/pages/user/consultationSubsidy/TableConsultationSubsidy'

export const metadata = {
  title: 'فهرست درخواست ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست پرونده ها'
  }
]

export default async function RequestsListPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <RequestListTable id={id} />
    </>
  )
}
