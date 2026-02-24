'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  CardHeader,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Checkbox,
  TextField
} from '@mui/material'
import { BiFemale, BiFile } from 'react-icons/bi'
import { BiMoney, BiUser } from 'react-icons/bi'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosConfig from '@/libs/auth/axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useCreateConsultationSubsidyInstitution } from '@/hooks/institution/consultationServices/useConsultationSubsidy'

export default function RequestFormInstitutionCreate({ data, show = {}, id }: any) {
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const router = useRouter()

  const { control, handleSubmit, setError, clearErrors, setValue, watch } = useForm({
    defaultValues: {
      consultation_subsidy_request_reason_id: null,
      consultation_subsidy_evaluation_type_id: null,
      consultation_subsidy_criterion_ids: [],
      evaluation_institution_id: null
    }
  })

  const { mutateAsync: create, isPending: loadingCreate }: any = useCreateConsultationSubsidyInstitution()

  async function onSubmit(values: any) {
    try {
      if (!selectedDocument) toast.error('ابتدا یک پرونده را انتخاب کنید')
      let data = {}
      if (values?.consultation_subsidy_request_reason_id == 1) {
        data = {
          consultation_subsidy_request_reason_id: values?.consultation_subsidy_request_reason_id,
          // consultation_subsidy_evaluation_type_id: null,
          // consultation_subsidy_criterion_ids: [],
          // evaluation_institution_id: null,
          consultation_document_id: selectedDocument?.id
        }
      } else {
        if (values?.consultation_subsidy_evaluation_type_id == 1) {
          data = {
            consultation_subsidy_request_reason_id: values?.consultation_subsidy_request_reason_id,
            consultation_subsidy_evaluation_type_id: values?.consultation_subsidy_evaluation_type_id,
            consultation_subsidy_criterion_ids: values?.consultation_subsidy_criterion_ids,
            // evaluation_institution_id: null,
            consultation_document_id: selectedDocument?.id
          }
        } else {
          data = {
            consultation_subsidy_request_reason_id: values?.consultation_subsidy_request_reason_id,
            consultation_subsidy_evaluation_type_id: values?.consultation_subsidy_evaluation_type_id,
            // consultation_subsidy_criterion_ids: [],
            evaluation_institution_id: values?.evaluation_institution_id?.id,
            consultation_document_id: selectedDocument?.id
          }
        }
      }

      const res = await toast.promise(create({ data: data, id: id }), {
        pending: 'در حال انجام....'
      })
      router.back()
    } catch (error) {
      throw error
    }
  }

  const { control: searchControl, handleSubmit: handleSubmitSearch } = useForm({
    defaultValues: {
      number: ''
    }
  })

  const [documentData, setDocumentData] = useState<any>()
  const [searchBy, setSearchBy] = useState('document_number')
  const [isLoad, setIsLoad] = useState(true)

  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: any) => {
      const res = await axiosConfig.get(`/institution/${id}/meeting/core/consultation-meeting/search-document`, {
        params: formData
      })

      return res
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    }
  })

  async function onSubmitSearch(values: any) {
    console.log({ [searchBy]: values?.number })
    clearErrors()
    try {
      const response = await toast.promise(mutateAsync({ [searchBy]: values?.number }), {
        pending: 'در حال انجام...'
      })
      setDocumentData(response.data?.data)
      console.log(response?.data, 'res')
      if (response.data.data) {
        toast.success('عملیات با موفقیت انجام شد')
      } else {
        toast.error('موردی یافت نشد')
      }
    } catch (error) {
      throw error
      // GeTErrorFetch({ error, setError })
    }
  }

  return (
    <>
      <Card>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              اطلاعات پرونده{' '}
            </Typography>
          }
          subheader={<Typography variant='caption'>ابتدا لطفا پرونده مورد نظر خود را انتخاب کنید</Typography>}
        />
        {!selectedDocument && (
          <form onSubmit={handleSubmitSearch(onSubmitSearch)}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2
                }}
              >
                <FormControl component='fieldset'>
                  <RadioGroup
                    row
                    value={searchBy}
                    onChange={e => {
                      setSearchBy(e.target.value)
                    }}
                  >
                    <FormControlLabel value='document_number' control={<Radio />} label='شماره پرونده' />
                    <FormControlLabel value='username' control={<Radio />} label='کد ملی' />
                  </RadioGroup>
                </FormControl>

                <Grid
                  container
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Grid item xs={7} sm={5}>
                    <Controller
                      control={searchControl}
                      name='number'
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          fullWidth
                          size='medium'
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              height: '48px',
                              fontSize: '14px',
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0
                            }
                          }}
                          placeholder={
                            searchBy === 'document_number' ? 'شماره پرونده را وارد کنید...' : 'کد ملی را وارد کنید...'
                          }
                          error={!!error}
                          {...field}
                          helperText={error?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={3} sm={1}>
                    <Button
                      variant='contained'
                      size='medium'
                      sx={{
                        height: '48px',
                        minWidth: '100%',
                        fontSize: '14px',
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0
                      }}
                      disabled={isPending}
                      type='submit'
                    >
                      جستجو
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              {documentData && (
                <Grid container spacing={6} mt={6}>
                  <Grid item xs={12}>
                    <Table
                      sx={{
                        minWidth: 650,
                        overflow: 'hidden'
                      }}
                    >
                      <TableHead
                        sx={{
                          '& .MuiTableCell-head': {
                            fontWeight: 500,
                            fontSize: '15px'
                          }
                        }}
                      >
                        <TableRow>
                          <TableCell align='center'>شماره پرونده</TableCell>
                          <TableCell align='center'>مشاور</TableCell>
                          <TableCell align='center'>نام و نام خانوادگی </TableCell>
                          <TableCell align='center'>موبایل</TableCell>
                          <TableCell align='center'>عملیات</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {documentData.map((document: any) => (
                          <TableRow key={document?.id} hover>
                            <TableCell align='center'>{document?.document_number}</TableCell>
                            <TableCell align='center'>
                              {`${document?.consultationMeetings[0]?.advisor?.first_name} ${document?.consultationMeetings[0]?.advisor?.last_name} (${document?.consultationMeetings[0]?.advisor?.username})`}
                            </TableCell>
                            <TableCell align='center'>{`${document?.first_name} ${document?.last_name} (${document?.username})`}</TableCell>
                            <TableCell align='center'>{document?.mobile}</TableCell>
                            <TableCell align='center'>
                              <Button variant='outlined' color='warning' onClick={() => setSelectedDocument(document)}>
                                انتخاب
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </form>
        )}

        {selectedDocument && (
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={3} md={3}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiFile color='#65f32dff' size={20} />
                  <Typography component='span' fontWeight={500}>
                    شماره پرونده:{' '}
                  </Typography>
                  <Typography component='span'>{selectedDocument?.document_number}</Typography>
                </Box>
              </Grid>

              <Grid item xs={3} md={3}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiUser color='#06ebebff' size={20} />
                  <Typography component='span' fontWeight={500}>
                    مشاور :
                  </Typography>
                  <Typography component='span'>
                    {' '}
                    {`${selectedDocument?.consultationMeetings[0]?.advisor?.first_name} ${selectedDocument?.consultationMeetings[0]?.advisor?.last_name} (${selectedDocument?.consultationMeetings[0]?.advisor?.username})`}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={3} md={3}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiFemale color='#f3a42dff' size={20} />
                  <Typography component='span' fontWeight={500}>
                    خدمت گیرنده
                  </Typography>
                  <Typography component='span'>{`${selectedDocument?.first_name} ${selectedDocument?.last_name} (${selectedDocument?.username})`}</Typography>
                </Box>
              </Grid>

              <Grid item xs={3} md={3}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiMoney color='#03a75aff' size={20} />
                  <Typography component='span' fontWeight={500}>
                    هزینه جلسه :
                  </Typography>
                  <Typography component='span'>{selectedDocument?.consultation_fee}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ mt: 5 }}>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                علت درخواست{' '}
              </Typography>
            }
            subheader={<Typography variant='caption'>ابتدا علت درخواست یارانه مشاوره را انتخاب کنید</Typography>}
          />
          <CardContent sx={{ mt: 0, p: 0 }}>
            <Grid container>
              <Grid item xs={12}>
                <FormControl component='fieldset' fullWidth>
                  <Controller
                    name='consultation_subsidy_request_reason_id'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <RadioGroup
                        row
                        value={value}
                        onChange={e => {
                          onChange(e?.target?.value)
                        }}
                        sx={{
                          justifyContent: 'center'
                        }}
                      >
                        {data?.consultationSubsidyRequestReasons?.map((el: any) => (
                          <FormControlLabel value={el?.id} key={el?.id} control={<Radio />} label={el?.name} />
                        ))}
                      </RadioGroup>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {watch('consultation_subsidy_request_reason_id') == 2 && (
          <Card sx={{ mt: 5 }}>
            <CardHeader
              sx={{ textAlign: 'center' }}
              subheader={<Typography variant='caption'>اطلاعات مربوط به سایر خدمات مشاوره را تکمیل کنید</Typography>}
            />
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <FormControl component='fieldset' fullWidth>
                    <FormLabel component='legend'>نوع ارزیابی :</FormLabel>
                    <Controller
                      name='consultation_subsidy_evaluation_type_id'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <RadioGroup
                          row
                          value={value}
                          onChange={e => {
                            onChange(e?.target?.value)
                          }}
                        >
                          {data?.consultationSubsidyEvaluationTypes?.map((el: any) => (
                            <FormControlLabel value={el?.id} key={el?.id} control={<Radio />} label={el?.name} />
                          ))}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Grid>

                {watch('consultation_subsidy_evaluation_type_id') == 1 && (
                  <Grid item xs={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                      <Typography fontWeight='700' variant='caption'>
                        شاخص های ارزیابی یارانه مشاوره
                      </Typography>
                    </Box>
                    <FormControl component='fieldset' fullWidth>
                      <Controller
                        name='consultation_subsidy_criterion_ids'
                        control={control}
                        render={({ field: { value, onChange } }) => {
                          const handleToggle = (serviceName: string) => {
                            //@ts-ignore
                            if (value.includes(serviceName)) {
                              onChange(value.filter((v: string) => v !== serviceName))
                            } else {
                              onChange([...value, serviceName])
                            }
                          }

                          return (
                            <Box sx={{ mt: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                              <Grid container>
                                {data?.consultationSubsidyCriteria?.map((service: any, idx: number) => (
                                  <Grid
                                    item
                                    xs={6}
                                    key={idx}
                                    sx={{
                                      borderBottom: '1px solid #ccc',
                                      borderRight: idx % 2 === 0 ? '1px solid #ccc' : 'none',
                                      padding: 1,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between'
                                    }}
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          //@ts-ignore
                                          checked={value.includes(service.id)}
                                          onChange={() => handleToggle(service.id)}
                                        />
                                      }
                                      label={service.name}
                                    />
                                    <Box
                                      sx={{
                                        minWidth: '40px',
                                        textAlign: 'center',
                                        bgcolor: '#f0f0f0',
                                        borderRadius: 1,
                                        px: 1,
                                        py: 0.5,
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        backgroundColor: '#8999f1ff',
                                        color: 'white'
                                      }}
                                    >
                                      {service.score}
                                    </Box>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          )
                        }}
                      />
                    </FormControl>
                  </Grid>
                )}

                {watch('consultation_subsidy_evaluation_type_id') == 2 && (
                  <Grid item xs={12} md={12}>
                    <Controller
                      name='evaluation_institution_id'
                      control={control}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/institution/${id}/consultation-subsidy/base/select/evaluation-institution`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={optien => optien?.name}
                          label='مرکز مشاوره'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}>
          <Button variant='contained' type='submit' disabled={loadingCreate}>
            {' '}
            ثبت
          </Button>
        </Box>
      </form>
    </>
  )
}
