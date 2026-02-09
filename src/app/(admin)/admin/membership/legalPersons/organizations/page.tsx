import Breadcrumb from "@/components/elements/Breadcrumb"
import OrganizationsTable from "@/components/pages/admin/membership/organization/TableOrganization"


export const metadata = {
    title: 'فهرست سازمان ها',
    description: 'می توانید فهرست سازمان ها را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست سازمان ها'
    }
]

export default function OrganizationPage() {
    return (
         <>
          <Breadcrumb items={items} />
          <OrganizationsTable />
         </>
    )
}
