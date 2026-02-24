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
  Checkbox
} from '@mui/material'
import { BiFile, BiHome } from 'react-icons/bi'
import { BiMoney, BiUser } from 'react-icons/bi'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useCreateConsultationSubsidy } from '@/hooks/user/useConsultationSubsidy'
import { useRouter } from 'next/navigation'

export default function RequestFormCreate({ data, show, id }: any) {
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

  const { mutateAsync, isPending }: any = useCreateConsultationSubsidy()

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

      const res = await toast.promise(mutateAsync({ data: data, id: id }), {
        pending: 'در حال انجام....'
      })
      router.back()
    } catch (error) {
      throw error
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
          <CardContent>
            <Grid container spacing={6}>
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
                      <TableCell align='center'>مرکز </TableCell>
                      <TableCell align='center'>هزینه</TableCell>
                      <TableCell align='center'>عملیات</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {show?.map((document: any) => (
                      <TableRow key={document?.id} hover>
                        <TableCell align='center'>{document?.document_number}</TableCell>
                        <TableCell align='center'>
                          {document?.advisors
                            ?.map((el: any) => `${el?.first_name} ${el?.last_name}(${el?.username})`)
                            .join(' _ ')}
                        </TableCell>
                        <TableCell align='center'>{document?.institution?.name}</TableCell>
                        <TableCell align='center'>{document?.consultation_fee}</TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='outlined'
                            size='small'
                            color='warning'
                            onClick={() => setSelectedDocument(document)}
                          >
                            انتخاب
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </CardContent>
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
                    مشاوران :
                  </Typography>
                  <Typography component='span'>
                    {' '}
                    {selectedDocument?.advisors
                      ?.map((el: any) => `${el?.first_name} ${el?.last_name}(${el?.username})`)
                      .join(' _ ')}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={3} md={3}>
                <Box display='flex' alignItems='center' gap={1}>
                  <BiHome color='#f3a42dff' size={20} />
                  <Typography component='span' fontWeight={500}>
                    مرکز مشاوره:
                  </Typography>
                  <Typography component='span'>{selectedDocument?.institution?.name}</Typography>
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
                          <FormControlLabel key={el?.id} value={el?.id} control={<Radio />} label={el?.name} />
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
                                {data?.consultationSubsidyCriteria?.map((service: any, idx: any) => (
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
                          url={`/user/${id}/consultation-subsidy/base/select/evaluation-institution`}
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
          <Button variant='contained' type='submit'>
            {' '}
            ثبت
          </Button>
        </Box>
      </form>
    </>
  )
}
