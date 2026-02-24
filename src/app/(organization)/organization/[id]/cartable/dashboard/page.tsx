import Breadcrumb from '@/components/elements/Breadcrumb'
import DashboardOrganizationCard from '@/components/pages/organization/cartable/DashboardOrganization'

export const metadata = {
  title: 'داشبورد',
  description: 'می توانید داشبورد مرکز را مشاهده کنید'
}

export default async function DashboardOrganization({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // const show = await fetchDataDashboardUser(id)
  return (
    <>
      <Breadcrumb items={[]} />
      <DashboardOrganizationCard id={id} />
    </>
  )
}
