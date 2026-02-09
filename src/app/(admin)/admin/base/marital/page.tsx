import Breadcrumb from "@/components/elements/Breadcrumb"
import MaritalTable from "@/components/pages/admin/base/marital/TableMarital"

export const metadata = {
    title: 'فهرست وضعیت تاهل ها',
    description: 'می توانید فهرست وضعیت تاهل ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست وضعیت تاهل ها'
    }
]

export default function MaritalPage() {
    return (
         <>
            <Breadcrumb items={items} />
            <MaritalTable />
         </>
    )
}
