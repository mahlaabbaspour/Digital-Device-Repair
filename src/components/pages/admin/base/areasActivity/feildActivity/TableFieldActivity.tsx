'use client'

import CustomTable from "@/components/elements/customTable/CustomTable";
import { API_ROUTS_ADMIN } from "@/configs/urls";
import { Button } from "@mui/material";
import {  HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalCreateFieldActivity from "./ModalCreateFieldActivity";
import ModalUpdateFieldActivity from "./ModalUpdateFieldActivity";



const dataStruct = {
  title: ['نام', ],
  name: [['name']],
  align: ['', 'center'],
  filter: [true, ],
  sort: ['name', ],
  rowId: ['id'],
  customCol: [
    ([e ]: any) => e,
  ]
}

export default function FieldActivityTable({id}: any) {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenCreate, setModalOpenCreate] = useState(false);
    const [action, setAction] = useState<'edit' | 'show' | null>(null)
    const [currentRow, setCurrentRow] = useState<any>(null)
    const openEditModal = (row: any) => {
        setAction('edit')
        setCurrentRow(row)
        setModalOpen(true)

    }

     const openShowModal = (row: any) => {
        setAction('show')
        setCurrentRow(row)
        setModalOpen(true)

    }

     const openCreateModal = () => {
        setModalOpenCreate(true)

    }

    const router = useRouter();

    return (
        <>
        <ModalCreateFieldActivity id={id}  title="ایجاد حوزه فعالیت" description="می توانید حوزه فعالیت مورد نظر را ایجاد کنید" open={modalOpenCreate} onClose={() => setModalOpenCreate(false)} />
        <ModalUpdateFieldActivity id={id} action={action}  currentRow={currentRow} title={`${action === 'edit' ? 'ویرایش  حوزه فعالیت' : 'نمایش  حوزه فعالیت'}`} description={`${action === 'edit' ? 'می توانید حوزه فعالیت مورد نظر را ویرایش کنید' : 'می توانید حوزه فعالیت مورد نظر را مشاهده کنید'}`} open={modalOpen} onClose={() => setModalOpen(false)} />   
        <CustomTable
            baseUrl={`${API_ROUTS_ADMIN.AREASACTIVITY_BASE}/${id}/activity-field-area`}
            queryKey='fieldActivity'
            textBtn=''
            btnShow={false}
            dataStruct={dataStruct}
            previousData={[]}
            checkboxEnabled={true}
            setCurrentRow={setCurrentRow}
            titleTable={{ title: 'حوزه های فعالیت' , description: 'می توانید فهرست حوزه های فعالیت را مشاهده کنید'}}
             btnOperation={{
              status: () => true,
              delete: () => true,
              edit: () => false,
              show: () => false,
           
            }}
            customOperation={[
                {
                    icon: <HiOutlinePencilAlt />,
                    onClick: (row: any) => openEditModal(row),
                    if: () => true,
                    color: 'primary',
                    title: 'ویرایش'
                },
                 {
                    icon: <BiShowAlt />,
                    onClick: (row: any) => openShowModal(row),
                    if: () => true,
                    color: 'warning',
                    title: 'نمایش'
                },
                
            ]}
            cardHeader={{
                status: true,
                btn: <Button variant='contained' color="primary" onClick={() => openCreateModal()}>ایجاد حوزه فعالیت جدید</Button>
            }}
        />
        </>
    )
}
