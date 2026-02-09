'use client'

import CustomTable from "@/components/elements/customTable/CustomTable";
import { API_ROUTS_ADMIN } from "@/configs/urls";
import { useRouter } from "next/navigation";
import { FaNetworkWired } from 'react-icons/fa';

const dataStruct = {
  title: ['نام', 'شناسه', 'نوع سازمان', 'تلفن', 'کد پستی'],
  name: [['name'], ['identifier'], ['organizationType.name'], ['phone'], ['postal_code']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['name', 'identifier', 'organizationType.name', 'phone', 'postal_code'],
  rowId: ['id'],
  customCol: [
    ([e ]: any) => e,
    ([e]: any) => e,
    ([e]: any) =>  e ? e : '__',
    ([e]: any) =>  '__',
    ([e]: any) =>  '__',
  ]
}

export default function OrganizationsTable() {

  const router = useRouter();

    return (
        <CustomTable
            baseUrl={API_ROUTS_ADMIN.ORGANIZATION_BASE}
            queryKey='organization'
            textBtn=''
            btnShow={false}
            dataStruct={dataStruct}
            previousData={[]}
            titleTable={{ title: 'سازمان ها' , description: 'می توانید فهرست سازمان ها را مشاهده کنید'}}
            btnOperation={{
              status: () => true,
              delete: () => false,
              edit: () => false,
              show: () => true
            }}
            customOperation={[
              {
                  icon: <FaNetworkWired />,
                  onClick: (row: any) => router.push(`/admin/membership/legalPersons/organizations/${row?.id}/externalServer`),
                  if: () => true,
                  color: 'success',
                  title: 'سرور های خارجی'
                },
            ]}
        />
    )
}
