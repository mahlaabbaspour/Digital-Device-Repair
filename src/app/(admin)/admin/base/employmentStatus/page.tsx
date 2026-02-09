import Breadcrumb from "@/components/elements/Breadcrumb"
import EmploymentStatusTable from "@/components/pages/admin/base/employmentStatus/TableEmploymentStatus"

export const metadata = {
    title: 'فهرست وضعیت اشتغال ها',
    description: 'می توانید فهرست وضعیت اشتغال ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست وضعیت اشتغال ها'
    }
]

export default function EductionPage() {
    return (
         <>
            <Breadcrumb items={items} />
             <EmploymentStatusTable />
         </>
    )
}
