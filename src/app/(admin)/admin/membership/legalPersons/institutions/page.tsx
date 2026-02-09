import Breadcrumb from "@/components/elements/Breadcrumb"
import InstitutionsTable from "@/components/pages/admin/membership/institution/TableInstitutions"


export const metadata = {
    title: 'فهرست مراکز',
    description: 'می توانید فهرست مراکز را مشاهده کنید'
}

const items = [
    {
        title: 'فهرست مراکز'
    }
]

export default function OrganizationPage() {
    return (
         <>
          <Breadcrumb items={items} />
          <InstitutionsTable />
         </>
    )
}
