import Breadcrumb from '@/components/elements/Breadcrumb'
import CardOrganizationShow from '@/components/pages/admin/membership/organization/CardOrganizationShow'
import { fetchOrganizationShow } from '@/libs/admin/membership/legalPersons/organization/organization'

export const metadata = {
  title: 'نمایش سازمان',
  description: 'می توانید نمایش سازمان را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست سازمان ها',
    to: '/admin/membership/legalPersons/organizations'
  },
  {
    title: 'اطلاعات سازمان'
  }
]

export default async function OrganizationShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const show = await fetchOrganizationShow(id)

  return (
    <>
      <Breadcrumb items={items} />
      <CardOrganizationShow data={show} title='اطلاعات سازمان' description='می توانید اطلاعات سازمان را مشاهده کنید' />
    </>
  )
}
