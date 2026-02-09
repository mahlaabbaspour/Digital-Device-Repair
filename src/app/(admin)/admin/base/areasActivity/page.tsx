import Breadcrumb from "@/components/elements/Breadcrumb"
import AreasActivityTable from "@/components/pages/admin/base/areasActivity/TableAreasAcitivty"

export const metadata = {
    title: 'فهرست حیطه های فعالیت',
    description: 'می توانید فهرست حیطه های فعالیت را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست حیطه های فعالیت'
    }
]

export default function AreasActivityPage() {
    return (
         <>
            <Breadcrumb items={items} />
            <AreasActivityTable />
         </>
    )
}
