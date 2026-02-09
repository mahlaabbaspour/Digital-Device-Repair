import Breadcrumb from '@/components/elements/Breadcrumb'
import CardInstitutionShow from '@/components/pages/admin/membership/institution/CardInstitutionShow'
import { fetchInstitutionShow } from '@/libs/admin/membership/legalPersons/institutions/institution'

export const metadata = {
  title: 'نمایش مرکز',
  description: 'می توانید نمایش مرکز را مشاهده کنید'
}

export default async function OrganizationShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const show = await fetchInstitutionShow(id)

  const items = [
    {
      title: 'فهرست مرکز',
      to: '/admin/membership/legalPersons/institutions'
    },
    {
      title: `اطلاعات مرکز (${show?.name})`
    }
  ]

  return (
    <>
      <Breadcrumb items={items} />
      <CardInstitutionShow title='اطلاعات مرکز' description='می توانید اطلاعات مرکز را مشاهده کنید' data={show} />
    </>
  )
}
