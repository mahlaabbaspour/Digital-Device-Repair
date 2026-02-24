import Breadcrumb from '@/components/elements/Breadcrumb'
import DashboardUserCard from '@/components/pages/user/cartable/DashboardUser'
import { fetchDataDashboardUser } from '@/libs/user/dashboardUser'

export const metadata = {
  title: 'داشبورد',
  description: 'می توانید داشبورد مرکز را مشاهده کنید'
}

export default async function DashboardUser({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const show = await fetchDataDashboardUser(id)
  return (
    <>
      <Breadcrumb items={[]} />
      <DashboardUserCard show={show} />
    </>
  )
}
