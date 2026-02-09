'use client'

import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useTreeItem } from '@mui/x-tree-view/useTreeItem';
import {
  TreeItemContent,
  TreeItemLabel,
  TreeItemRoot,
  TreeItemGroupTransition,
} from '@mui/x-tree-view/TreeItem';
import { TreeItemProvider } from '@mui/x-tree-view/TreeItemProvider';
import { TreeItemDragAndDropOverlay } from '@mui/x-tree-view/TreeItemDragAndDropOverlay';
import { useTreeItemUtils } from '@mui/x-tree-view/hooks';
import { Button, Menu, Skeleton , MenuItem , Tooltip, Modal, Fade , Typography, CircularProgress } from '@mui/material';
import ModalCreateServiceRecipient from './ModalCreateServiceRicipient';
import { useQuery } from '@tanstack/react-query';
import axiosConfig from '@/libs/auth/axios';
import { FiAlertCircle, FiMoreVertical } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import ModalUpdateServiceRecipient from "./ModalUpdateServiceRicipient";
import { useDeleteServiceRecipient } from "@/hooks/admin/base/useServiceRecipient";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: 2
}


const CustomTreeItem = React.forwardRef(function CustomTreeItem({ id, itemId, label, disabled, children , onEdit , onDelete }: any, ref: React.Ref<HTMLLIElement>) {

  const {
    getRootProps,
    getContentProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    getContextProviderProps,
    status,
  } = useTreeItem({ id, itemId, children, label, disabled, rootRef: ref });


  const { interactions } = useTreeItemUtils({
    itemId,
    children,
  });

  const handleClick = (event: React.MouseEvent) => {
    interactions.handleExpansion(event);
  };

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <TreeItemProvider {...getContextProviderProps()}>
      <TreeItemRoot {...getRootProps({ sx: { position: 'relative' , marginBottom: '12px' } })}>
        {status.expandable && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
              width: '24px',
              height: 'calc(100% - 12px)',
              position: 'absolute',
              left: '-24px',
              top: '6px',
            }}
          >
            {status.expanded ? (
                <>
              <React.Fragment>
                <Box sx={{display: 'flex'}}>
                <IconButton
                  onClick={handleClick}
                  aria-label="collapse item"
                  size="small"
                  sx={{marginLeft: '30px'}}
                >
                  <IndeterminateCheckBoxOutlinedIcon  sx={{ fontSize: '14px' }} />
                </IconButton>
                <IconButton size="small" onClick={handleMenuClick}>
                      <FiMoreVertical fontSize="small" />
                </IconButton>
                <Menu
                   anchorEl={anchorEl}
                   open={openMenu}
                   onClose={handleMenuClose}
                   anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                   transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                   >
                      <MenuItem onClick={() => onEdit({itemId, label, parent})}>ویرایش</MenuItem>
                      <MenuItem onClick={() => onDelete(itemId)}>حذف</MenuItem>
                </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, borderLeft: '1px solid' }} />
              </React.Fragment>
                </>
            ) : (
                <Box sx={{display: 'flex'}}>
                <IconButton
                onClick={handleClick}
                aria-label="Expand item"
                size="small"
              >
                <AddBoxOutlinedIcon sx={{ fontSize: '14px' }} />
                 </IconButton>
                  <IconButton size="small" onClick={handleMenuClick}>
                      <FiMoreVertical fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
               >
                        <MenuItem onClick={() => onEdit({itemId, label, parent})}>ویرایش</MenuItem>
                        <MenuItem onClick={() => onDelete(itemId)}>حذف</MenuItem>
                </Menu>
                </Box>
            )}
          </Box>

        
        )}
 
        <TreeItemContent
          sx={{
            marginLeft: '30px',
            padding: '12px 16px',
            backgroundColor: '#f4f4f9', 
            borderRadius: '8px', 
            border: '1px solid #ddd', 
            transition: 'background-color 0.3s', 
            '&:hover': {
              backgroundColor: '#e3f2fd',
            },
          }}
        {...getContentProps()}
        >
          <TreeItemLabel {...getLabelProps()} />

        {!status.expandable && (
             <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={'ویرایش'} arrow>
                    <IconButton onClick={() => onEdit({itemId, label, parent})} sx={{ scale: 0.95 }} color='primary' >
                         <HiOutlinePencil size='1.3rem' />
                    </IconButton>
                 </Tooltip>


                  <Tooltip title={'حذف'} arrow>
                    <IconButton onClick={() => onDelete(itemId)} sx={{ scale: 0.95 }} color='error' >
                         <IoTrashOutline />
                    </IconButton>
                 </Tooltip>
              
            </Box>
           )}

          <TreeItemDragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </TreeItemContent>
          {children && <TreeItemGroupTransition
               sx={{
                   marginLeft: '35px', 
                   marginTop: '12px',
                   marginBottom: '5px',
                }}
              {...getGroupTransitionProps()} 
         />}
      </TreeItemRoot>
    </TreeItemProvider>
  );
});

export default function  ServiceRecipientTable() {
        const [datas, setDatas] = useState<any>(null)
        const [modalOpen, setModalOpen] = useState(false);
        const [modalOpenCreate, setModalOpenCreate] = useState(false);
        const [modalDelete, setModalDelete] = useState(false)
        const [action, setAction] = useState<'edit' | 'show' | 'delete' | null>(null)
        const [currentRow, setCurrentRow] = useState<any>(null)


        const openEditModal = (row: any) => {
            setAction('edit')
            setCurrentRow(row)
            setModalOpen(true)
    
        }

         const openDeleteModal = (row: any) => {
            setCurrentRow(row)
            setModalDelete(true)
    
        }

         const openCreateModal = () => {
            setModalOpenCreate(true)
    
        }


        const deleteFeild = async (id: string) => {
            try {
              const res = await toast.promise(mutateAsync(id), {
                pending: 'در حال انجام...'
              })
              setModalDelete(false)
              
            } catch (error) {
               throw error
            }
        }

         
        const { mutateAsync , isPending} : any = useDeleteServiceRecipient();
        const { data , isLoading } = useQuery({
                queryKey: ['serviceRecipient'],
                queryFn: async () => {
                    try {
                         const res = await axiosConfig.get(`/admin/base/service-recipient-type`)
                         const data = await res.data;
                    
                         return data
                        
                    } catch (error) {
                         throw error
                    }
                },
                staleTime: 5 * 60 * 1000,
                enabled: true
            })

         useEffect(() => {
            setDatas(data?.data ?? [])
        }, [data])


  return (
    <>
    <ModalCreateServiceRecipient title="ایجاد خدمت گیرنده" description="می توانید خدمت گیرنده مورد نظر را ایجاد کنید" open={modalOpenCreate} onClose={() => setModalOpenCreate(false)} />
    <ModalUpdateServiceRecipient action={action}  currentRow={currentRow} title={`${action === 'edit' ? 'ویرایش خدمت گیرنده' : 'نمایش  خدمت گیرنده'}`} description={`${action === 'edit' ? 'می توانید خدمت گیرنده مورد نظر را ویرایش کنید' : 'می توانید خدمت گیرنده مورد نظر را مشاهده کنید'}`} open={modalOpen} onClose={() => setModalOpen(false)} />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={modalDelete}
        onClose={() => ('')}
        closeAfterTransition
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={modalDelete} className='relative'>
          <Box sx={{ ...style }}>
            <div className='absolute  end-3 top-3'>
              <IconButton onClick={() => setModalDelete(false)}>
                <AiOutlineClose />
              </IconButton>
            </div>
            <div className='w-full flex justify-center'>
              <IconButton color='error'>
                <FiAlertCircle className='size-[60px]' />
              </IconButton>
            </div>

            <Typography id='transition-modal-title' className='text-center' variant='h5' component='h5' sx={{ mt: 3 }}>
               حذف خدمت گیرنده
            </Typography>
            <Typography id='transition-modal-description' variant='subtitle1' className='text-center' sx={{ mt: 3 }}>
               آیا از حذف خدمت گیرنده اطمینان دارید؟
            </Typography>

            <div className='mt-8 flex w-full justify-end'>
              <div className='flex gap-3'>
                <Button onClick={() => setModalDelete(false)} variant='contained'>
                  انصراف
                </Button>
                {isPending ? (
                  <Button color='error' variant='contained'>
                    {' '}
                    <CircularProgress size={20} color='inherit' />
                  </Button>
                ) : (
                  <Button onClick={() => deleteFeild(currentRow)} disabled={isPending} color='error' variant='contained'>
                    بله
                  </Button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>    
    <Button sx={{ mt: 7}} variant='contained' color="primary" onClick={() => openCreateModal()}>ایجاد خدمت گیرنده جدید</Button>

    {
        datas ? (
          <Box sx={{ minHeight: 200, minWidth: 350, mt: 3 }}>
           <RichTreeView
              items={datas}
              defaultExpandedItems={['grid']}
              slots={{ item: (props: any) => (
                <CustomTreeItem
                   {...props}
                   raw={props?.raw}
                   onEdit={(item: any) => openEditModal(item)}
                   onDelete={(item: any) => openDeleteModal(item) }
                />
              ) }}
              getItemLabel={(item: any) => item?.label || item?.name}
              />
          </Box>
         ) : (
            <Box>
                {new Array(3).fill(0).map((_: any, i: any) => (
                    <Box key={i} sx={{ width: '100%', display: 'flex', justifyContent: 'center', maxWidth: 'auto' }}>
                            <Skeleton animation='wave' height={70} sx={{ width: '100%' }} />
                    </Box>   
                 ))}
            </Box>
         )
    }

    
</>
  );
}
