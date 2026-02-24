'use client'

import CustomChip from '@/@core/components/mui/chip/index'
import CustomTable from '@/components/elements/customTable/CustomTable'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSync } from 'react-icons/bi'
// import ChangeStatusDocument from './ChangeStatusDocument'
import { MdFactCheck } from 'react-icons/md'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  CardHeader,
  Divider,
  Button,
  Grid,
  Autocomplete,
  TextField,
  CardContent,
  Pagination,
  Select,
  FormControl,
  MenuItem,
  Skeleton
} from '@mui/material'
import { dateConverter } from '@/helpers/DateHelpers'
import CustomDatePicker from '@/components/elements/customDatePicker'
import { useFetchDocumentConsultationOrganiation } from '@/hooks/organization/useConsultationSubsidyOrganization'

const dataStruct = {
  title: ['شماره پرونده', 'کد ملی', 'نام و نام خانوادگی ', 'موبایل', 'وضعیت'],
  name: [['document_number'], ['username'], ['first_name', 'last_name'], ['mobile'], ['consultationDocumentStatus']],
  align: ['', 'center', 'center', 'center', 'center'],
  filter: [true, true, true, true, true],
  sort: ['document_number', 'last_name', 'username', 'mobile', 'status'],
  rowId: ['id'],
  customCol: [
    ([e]: any) => e,
    ([e]: any) => e,
    ([e, c]: any) => `${e} ${c}`,
    ([e]: any) => e,
    ([e]: any) => {
      return (
        <CustomChip
          label={e?.id === 1 ? 'مفتوح' : e?.id === 2 ? 'مختومه' : e?.id === 3 ? 'ارجاع شده' : ''}
          color={e?.id === 1 ? 'success' : e?.id === 2 ? 'error' : e?.id === 3 ? 'warning' : 'primary'}
          skin='light'
          variant='outlined'
        />
      )
    }
  ]
}

export default function ConsultationDocumentTable({ id, upsertData = [] }: any) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [currunt, setCurrent] = useState<any>(null)

  const handleClosed = (row: any) => {
    setOpen(true)
    setCurrent(row)
  }

  const {
    control: controlFilter,
    handleSubmit: handleSubmitFilter,
    reset,
    watch
  } = useForm({
    defaultValues: {
      document_id: null,
      username: '',
      mobile: '',
      fullName: '',
      province_ids: [],
      city_ids: [],
      institution_ids: []
    }
  })

  const [filters, setFilters] = useState<any>({})
  const { data: documents, isLoading }: any = useFetchDocumentConsultationOrganiation({ id: id, params: filters })
  console.log(documents, 'sjdflj')

  async function onSubmitFilter(values: any) {
    try {
      const data = {
        id: values?.document_id?.id,
        username: values?.username,
        mobile: values?.mobile,
        fullName: values?.fullName,
        institution_ids: values?.institution_ids?.map((el: any) => el?.id)
      }
      setFilters(data)
    } catch (error) {
      throw error
    }
  }

  const province_ids = watch('province_ids')
  const provinceQuery = province_ids?.map((p: any, index) => `province_ids[${index}]=${p.id}`).join('&')

  const institution_ids = watch('city_ids')
  const institutionQuery = institution_ids?.map((p: any, index) => `city_ids[${index}]=${p.id}`).join('&')
  const document_ids = watch('institution_ids')
  const documentQuery = document_ids?.map((p: any, index) => `institution_ids[${index}]=${p.id}`).join('&')

  return (
    <>
      {/* <ChangeStatusDocument open={open} onClose={() => setOpen(false)} selectedRow={currunt} id={id} /> */}
      <Accordion expanded={open} onChange={() => setOpen(prev => !prev)} elevation={0}>
        <AccordionSummary
          expandIcon={open ? <ExpandLessIcon sx={{ fontSize: 30 }} /> : <ExpandMoreIcon sx={{ fontSize: 30 }} />}
          sx={{
            minHeight: '100px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            '& .MuiAccordionSummary-expandIconWrapper': {
              order: 0,
              marginBottom: 1
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }
          }}
        >
          <Typography variant='h6' fontWeight='bold'>
            فیلترهای پیشرفته
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            می توانید فهرست پرونده های مورد نظر را فیلتر کنید
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Box>
            <form onSubmit={handleSubmitFilter(onSubmitFilter)}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={4}>
                    <Controller
                      name='province_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/inPerson-consultation/base/select/province`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          multiple={true}
                          getOptionLabel={option => option?.name}
                          label='استان'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Controller
                      name='city_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/inPerson-consultation/base/select/city${provinceQuery ? `?${provinceQuery}` : ``}`}
                          readOnly={false}
                          multiple={true}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.document_number})`
                          }
                          label='شهرستان'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Controller
                      name='institution_ids'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/inPerson-consultation/base/select/institution${institutionQuery ? `?${institutionQuery}` : ``}`}
                          readOnly={false}
                          multiple={true}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.document_number})`
                          }
                          label='مرکز'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* document_id */}
                  <Grid item xs={12} md={3}>
                    <Controller
                      name='document_id'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomAsyncAutocomplete
                          url={`/organization/${id}/inPerson-consultation/base/select/inPerson-consultation${documentQuery ? `?${documentQuery}` : ``}`}
                          readOnly={false}
                          onAddValue={newValue => onChange(newValue)}
                          value={value}
                          getOptionLabel={option =>
                            `${option?.first_name} ${option?.last_name} (${option?.document_number})`
                          }
                          label='پرونده های مرکز'
                          error={!!error}
                          helperText={error?.message}
                        ></CustomAsyncAutocomplete>
                      )}
                    />
                  </Grid>

                  {/* username */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='username'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='کدملی'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>

                  {/* mobile */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='mobile'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='شماره  موبایل'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>

                  {/* full_name */}
                  <Grid item xs={12} sm={3}>
                    <Controller
                      name='fullName'
                      control={controlFilter}
                      render={({ field: { onChange, value }, fieldState: { error } }) => {
                        return (
                          <TextField
                            label='نام و نام خانوادگی'
                            fullWidth
                            error={!!error}
                            helperText={error?.message}
                            value={value}
                            onChange={onChange}
                            InputProps={{ readOnly: false }}
                          />
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt: 10 }}>
                  <Button
                    variant='outlined'
                    sx={{ fontFamily: 'inherit' }}
                    color='primary'
                    disabled={false}
                    type='submit'
                  >
                    جستجو
                  </Button>
                </Box>
              </CardContent>
            </form>
          </Box>
        </AccordionDetails>
      </Accordion>
      <CustomTable
        baseUrl={`/`}
        queryKey='documentUser'
        textBtn=''
        btnShow={false}
        dataStruct={dataStruct}
        previousData={documents}
        checkboxEnabled={true}
        titleTable={{ title: 'پرونده های مشاوره', description: 'می توانید فهرست پرونده های مشاوره را مشاهده کنید' }}
        btnOperation={{
          status: () => true,
          delete: () => false,
          edit: () => false,
          show: () => true
        }}
      />
    </>
  )
}
