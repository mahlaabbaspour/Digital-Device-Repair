'use client'


import { GeTErrorFetch } from "@/components/elements/errorHandler";
import SubmitButton from "@/components/elements/submitButton";
import { Transition } from "@/helpers/DialogsHelper";
import { useCreateSMSServer, useUpdateSMSServer } from "@/hooks/admin/membership/useExternalServer";
import { Icon } from "@iconify/react";
import { Box, Dialog, DialogActions, DialogContent, FormControlLabel, Grid, IconButton, Switch, TextField } from "@mui/material";
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";


function CreateSMSServer({ action, currentRow, id ,open, title, description , setOpen , disabled} : any) {

    console.log(action, currentRow)


      const { handleSubmit, control, formState: { errors }, setError, setValue, reset, clearErrors }: any = useForm({
        defaultValues: {
            name: '',
            address:  '',
            username: '',
            password: '',
            domain: '',
            phone: '',
            is_current:  false,
        }
    });
    const rowId = currentRow?.id
    console.log(rowId, 'ROWID')
    const type = action;

        useEffect(() => {
    
            if(currentRow && action === 'edit') {
                clearErrors()
                setValue('name', currentRow?.name)
                setValue('address', currentRow?.address)
                setValue('username', currentRow?.username)
                setValue('password', currentRow?.password)
                setValue('domain', currentRow?.domain)
                setValue('phone', currentRow?.phone)
                setValue('is_current', currentRow?.is_current)
            }
    
        }, [currentRow, action])

    const { mutateAsync : create , isPending : isLoadingCreate}: any = useCreateSMSServer();
    const { mutateAsync: update , isPending : isLoadingUpdate}: any = useUpdateSMSServer();

    const onSubmit = async (values: any) => {
          try {
             
             if(type === 'create') {
                 await toast.promise(create({ data: values, id: id}), {
                   pending: 'در حال انجام ...'
                })
               handleCloseModal()
               reset()
             } else  {
                      await toast.promise(update({ data: values, id: id , rowId: rowId }), {
                   pending: 'در حال انجام ...'
                })
               handleCloseModal()
               reset()
             }
 
            
            
          } catch (error) {
            console.log(error, 'error')
              GeTErrorFetch({error, setError})
          }
    }

       function handleCloseModal() {
        clearErrors()
        setOpen(false)
    }


    return (
         <Dialog
         TransitionComponent={Transition}
          fullWidth
          open={open}
          maxWidth='md'
          scroll='body'
    >
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent sx={{mt: 5}}>
                <IconButton
                        size='small'
                        onClick={handleCloseModal}
                        sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                    >
                        <Icon icon='mdi:close' />
                    </IconButton>
                    <Box sx={{ mb: 9, textAlign: 'center' }}>
                        <Typography variant='h5' sx={{ mb: 2, lineHeight: '1rem' ,  fontWeight: 900 }}>
                            {title}
                        </Typography>
                        <Typography variant='caption'>
                            {description}
                        </Typography>
                    </Box>

                    <Grid container spacing={5} mt={2} p={5}>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                       {...field}
                                       error={!!error}
                                       InputProps={{ readOnly: disabled }}
                                       helperText={error?.message}
                                       fullWidth
                                       label='نام'
                                     />
                                )}
                            />
                        </Grid>


                         <Grid item xs={12} sm={6}>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                       {...field}
                                       error={!!error}
                                       InputProps={{ readOnly: disabled }}
                                       helperText={error?.message}
                                       fullWidth
                                       label='آدرس'
                                     />
                                )}
                            />
                        </Grid>


                        
                         <Grid item xs={12} sm={6}>
                            <Controller
                                name="username"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                       {...field}
                                       error={!!error}
                                       InputProps={{ readOnly: disabled }}
                                       helperText={error?.message}
                                       fullWidth
                                       label='نام کاربری'
                                     />
                                )}
                            />
                        </Grid>

                        
                         <Grid item xs={12} sm={6}>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                       {...field}
                                       error={!!error}
                                       InputProps={{ readOnly: disabled }}
                                       helperText={error?.message}
                                       fullWidth
                                       label='پسورد'
                                     />
                                )}
                            />
                        </Grid>

                        
                         <Grid item xs={12} sm={6}>
                            <Controller
                                name="domain"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                       {...field}
                                       error={!!error}
                                       InputProps={{ readOnly: disabled }}
                                       helperText={error?.message}
                                       fullWidth
                                       label='دامنه'
                                     />
                                )}
                            />
                        </Grid>

                         <Grid item xs={12} sm={6}>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                       {...field}
                                       error={!!error}
                                       InputProps={{ readOnly: disabled }}
                                       helperText={error?.message}
                                       fullWidth
                                       label='تلفن'
                                     />
                                )}
                            />
                        </Grid>



                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="is_current"
                                control={control}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <FormControlLabel
                                        sx={{ m: 2}}
                                        label="فعال جاری"
                                        control={
                                            <Switch checked={value === '1'} onChange={(_, check) => !disabled && onChange(check ? '1' : 0)} />
                                        }
                                    />
                                )}
                            />
                        </Grid>

                    </Grid>
            </DialogContent>

            <DialogActions>
                <Button variant='contained' sx={{ fontFamily: 'inherit' }} color='error' onClick={handleCloseModal}>
                     بستن
                </Button>
                <SubmitButton disabled={isLoadingCreate || isLoadingUpdate} />
            </DialogActions>

        </form>

    </Dialog>

    )


   

}

export default CreateSMSServer;
