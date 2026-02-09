import Breadcrumb from "@/components/elements/Breadcrumb"
import RefferrerTypeTable from "@/components/pages/admin/base/refferrerType/TableRefferrerType"

export const metadata = {
    title: 'فهرست معرف ها',
    description: 'می توانید فهرست معرف ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست معرف ها'
    }
]

export default function RefferrerTypePage() {
    return (
         <>
            <Breadcrumb items={items} />
            <RefferrerTypeTable />
         </>
    )
}
