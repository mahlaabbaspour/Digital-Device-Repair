import Breadcrumb from "@/components/elements/Breadcrumb"
import EducationTable from "@/components/pages/admin/base/education/TableEducation"

export const metadata = {
    title: 'فهرست تحصیلات ها',
    description: 'می توانید فهرست تحصیلات ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست تحصیلات ها'
    }
]

export default function EductionPage() {
    return (
         <>
            <Breadcrumb items={items} />
             <EducationTable />
         </>
    )
}
