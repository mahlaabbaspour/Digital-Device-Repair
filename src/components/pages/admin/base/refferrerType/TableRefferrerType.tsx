'use client'

import CustomTable from "@/components/elements/customTable/CustomTable";
import { API_ROUTS_ADMIN } from "@/configs/urls";
import { Button } from "@mui/material";
import {  HiOutlinePencilAlt } from 'react-icons/hi'
import { BiShowAlt } from 'react-icons/bi'
import { useState } from "react";
import ModalLCreateRefferrerType from "./ModalCreateRefferrerType";
import ModalUpdateRefferrerType from "./ModalUpdateRefferrerType";


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

export default function RefferrerTypeTable() {
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
        <ModalLCreateRefferrerType  title="ایجاد معرف" description="می توانید معرف مورد نظر را ایجاد کنید" open={modalOpenCreate} onClose={() => setModalOpenCreate(false)} />
        <ModalUpdateRefferrerType action={action}  currentRow={currentRow} title={`${action === 'edit' ? 'ویرایش معرف' : 'نمایش  معرف'}`} description={`${action === 'edit' ? 'می توانید معرف مورد نظر را ویرایش کنید' : 'می توانید معرف مورد نظر را مشاهده کنید'}`} open={modalOpen} onClose={() => setModalOpen(false)} />   
        <CustomTable
            baseUrl={API_ROUTS_ADMIN.REFFERRERTYPE_BASE}
            queryKey='refferrerType'
            textBtn=''
            btnShow={false}
            dataStruct={dataStruct}
            previousData={[]}
            checkboxEnabled={true}
            setCurrentRow={setCurrentRow}
            titleTable={{ title: 'معرف ها' , description: 'می توانید فهرست معرف ها را مشاهده کنید'}}
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
                btn: <Button variant='contained' color="primary" onClick={() => openCreateModal()}>ایجاد معرف جدید</Button>
            }}
        />
        </>
    )
}
