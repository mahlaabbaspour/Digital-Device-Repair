import Breadcrumb from '@/components/elements/Breadcrumb'
import VehicleOverview from '@/components/pages/admin/base/region/RegionTreeView'
import { fetchRegions } from '@/libs/admin/base/region'

export const metadata = {
  title: 'فهرست تقسیمات کشوری',
  description: 'می توانید فهرست تقسمیات کشوری را مشاهده کنید'
}

const items = [
  {
    title: 'فهرست تقسیمات کشوری'
  }
]

export default async function RegionPage() {
  const data = await fetchRegions()

  return (
    <>
      <Breadcrumb items={items} />
      <VehicleOverview data={data} />
    </>
  )
}
