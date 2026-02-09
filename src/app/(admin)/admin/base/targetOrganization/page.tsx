import Breadcrumb from '@/components/elements/Breadcrumb'
import TargetOrganizationTable from '@/components/pages/admin/base/targetOrganization/TableTargetOrganization'

export const metadata = {
  title: 'فهرست سازمان های مخاطب',
  description: 'می توانید فهرست سازمان های مخاطب را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست سازمان های مخاطب'
  }
]

export default async function RegionPage() {
  return (
    <>
      <Breadcrumb items={items} />
      <TargetOrganizationTable />
    </>
  )
}
