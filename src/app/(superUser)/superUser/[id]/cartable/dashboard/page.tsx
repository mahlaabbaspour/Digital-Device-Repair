import Breadcrumb from '@/components/elements/Breadcrumb'
import DashboardInstitutionCard from '@/components/pages/institution/cartable/DashboardInstitution'

export const metadata = {
  title: 'داشبورد',
  description: 'می توانید داشبورد مرکز را مشاهده کنید'
}

export default function DashboardUser() {
  return (
    <>
      <Breadcrumb items={[]} />
      <DashboardInstitutionCard />
    </>
  )
}
