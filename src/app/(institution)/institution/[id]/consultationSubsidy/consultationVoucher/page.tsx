import Breadcrumb from '@/components/elements/Breadcrumb'
import ConsultationVoucherTable from '@/components/pages/institution/consultationSubsidy/ConsultationVoucherTable'

export const metadata = {
  title: 'فهرست یاری برگ ها',
  descritpion: 'می توانید فهرست درخواست ها را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست یاری برگ ها'
  }
]

export default async function ConsultationVoucherPage({ params }: any) {
  const { id } = await params
  return (
    <>
      <Breadcrumb items={items} />
      <ConsultationVoucherTable id={id} />
    </>
  )
}
