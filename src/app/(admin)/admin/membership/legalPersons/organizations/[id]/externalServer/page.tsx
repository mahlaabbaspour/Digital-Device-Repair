import Breadcrumb from "@/components/elements/Breadcrumb"
import ExternalServerTable from "@/components/pages/admin/membership/organization/TableExternalServer"

export const metadata = {
    title: 'فهرست سرور های خارجی',
    description: 'می توانید فهرست سرور های خارجی را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست سازمان ها',
        to: '/admin/membership/legalPersons/organizations'
    },
    {
        title: 'فهرست سرور های خارجی'
    }
]

export default async function ExternalServerPage({ params } : { params: Promise<{id: string}>}) {
    const { id } = await params;

    return (
         <>
          <Breadcrumb items={items} />
          <ExternalServerTable id={id} />
         </>
    )
}
