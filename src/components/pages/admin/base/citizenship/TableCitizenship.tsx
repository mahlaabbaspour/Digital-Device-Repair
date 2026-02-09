'use client'

import CustomTable from "@/components/elements/customTable/CustomTable";
import { API_ROUTS_ADMIN } from "@/configs/urls";
import { Button } from "@mui/material";
import {  HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { useState } from "react";
import ModalCreateCitizenship from "./ModalCreateCitizenship";
import ModalUpdateCitizenship from "./ModalUpdateCitizenship";




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

export default function CitizenshipTable() {
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

    return (
        <>
        <ModalCreateCitizenship  title="ایجاد تابعیت" description="می توانید تابعیت مورد نظر را ایجاد کنید" open={modalOpenCreate} onClose={() => setModalOpenCreate(false)} />
        <ModalUpdateCitizenship action={action}  currentRow={currentRow} title={`${action === 'edit' ? 'ویرایش تابعیت' : 'نمایش تابعیت'}`} description={`${action === 'edit' ? 'می توانید ملیت مورد نظر را ویرایش کنید' : 'می توانید ملیت مورد نظر را مشاهده کنید'}`} open={modalOpen} onClose={() => setModalOpen(false)} />   
        <CustomTable
            baseUrl={API_ROUTS_ADMIN.CITIZENSHIP_BASE}
            queryKey='citizenship'
            textBtn=''
            btnShow={false}
            dataStruct={dataStruct}
            previousData={[]}
            checkboxEnabled={true}
            setCurrentRow={setCurrentRow}
            titleTable={{ title: 'تابعیت ها' , description: 'می توانید فهرست تابعیت ها را مشاهده کنید'}}
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
                }
            ]}
            cardHeader={{
                status: true,
                btn: <Button variant='contained' color="primary" onClick={() => openCreateModal()}>ایجاد تابعیت جدید</Button>
            }}
        />
        </>
    )
}
