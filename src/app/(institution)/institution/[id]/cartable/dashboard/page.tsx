import Breadcrumb from '@/components/elements/Breadcrumb'
import DashboardInstitutionCard from '@/components/pages/institution/cartable/DashboardInstitution'
import { fetchDataDashboardInstitution } from '@/libs/institution/cartable/dashboard'

export const metadata = {
  title: 'داشبورد مرکز',
  description: 'می توانید داشبورد مرکز را مشاهده کنید'
}

export default async function DashboardInstitution({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const show = await fetchDataDashboardInstitution(id)

  return (
    <>
      <Breadcrumb items={[]} />
      <DashboardInstitutionCard show={show} />
    </>
  )
}
