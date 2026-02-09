'use client'

import CustomTable from "@/components/elements/customTable/CustomTable";
import { API_ROUTS_ADMIN } from "@/configs/urls";


const dataStruct = {
  title: ['نام', 'شناسه', 'سازمان بهزیستی ناظر', 'حوزه حیطه فعالیت', 'کد پستی'],
  name: [['name'], ['identifier'], ['supervisoryOrganization.name'], ['activityFieldArea.name'], ['postal_code']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['name', 'identifier', 'organizationType.name', 'phone', 'postal_code'],
  rowId: ['id'],
  customCol: [
    ([e ]: any) => e,
    ([e]: any) => e,
    ([e]: any) =>  e ? e : '__',
    ([e]: any) =>   e ? e : '__',
    ([e]: any) =>  '__',
  ]
}

export default function InstitutionsTable() {
    return (
        <CustomTable
            baseUrl={API_ROUTS_ADMIN.INSTITUTION_BASE}
            queryKey='institutions'
            textBtn=''
            btnShow={false}
            dataStruct={dataStruct}
            previousData={[]}
            titleTable={{ title: 'مراکز' , description: 'می توانید فهرست مراکز را مشاهده کنید'}}
             btnOperation={{
              status: () => true,
              delete: () => false,
              edit: () => false,
              show: () => true
            }}
        />
    )
}
