import Breadcrumb from "@/components/elements/Breadcrumb"
import ServiceRecipientTable from "@/components/pages/admin/base/serviceRecipient/TableServiceRecipient";


export const metadata = {
    title: 'فهرست خدمت گیرنده',
    description: 'می توانید فهرست خدمت گیرنده را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست خدمت گیرندگان'
    }
]

export default async function RegionPage() {

    return (
         <>
            <Breadcrumb items={items} />
            <ServiceRecipientTable  />
         </>
    )
}
