'use client'

import { useEffect } from 'react'
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CardHeader,
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Chip,
  Divider
} from '@mui/material'
import { BiFemale, BiFile } from 'react-icons/bi'
import { BiMoney, BiUser } from 'react-icons/bi'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import { Controller, useForm } from 'react-hook-form'
import { useCreateConsultationSubsidyInstitution } from '@/hooks/institution/consultationServices/useConsultationSubsidy'
import InfoBox from '@/components/elements/InfoBox'
import { gradients } from '@/configs/bgColor'
import TableConsultationVouchers from './TableConsultationVouchers'

export default function CardRequestShowInstitution({ data, show, id }: any) {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      consultation_subsidy_request_reason_id: null,
      consultation_subsidy_evaluation_type_id: null,
      consultation_subsidy_criterion_ids: [],
      evaluation_institution_id: null
    }
  })

  useEffect(() => {
    if (show) {
      setValue('consultation_subsidy_request_reason_id', show?.consultationSubsidyRequestReason?.id)
      setValue('consultation_subsidy_evaluation_type_id', show?.consultationSubsidyEvaluationType?.id)
      setValue(
        'consultation_subsidy_criterion_ids',
        show?.consultationSubsidyCriteria?.map((el: any) => el?.id)
      )
      setValue('evaluation_institution_id', show?.evaluationInstitution?.id)
    }
  }, [show])

  return (
    <>
      <Card>
        <CardHeader
          sx={{ textAlign: 'center', pb: 1, mb: 5 }}
          title={
            <Typography variant='h6' fontWeight={800}>
              اطلاعات درخواست
            </Typography>
          }
          subheader={
            <Typography variant='caption' color='text.secondary'>
              می توانید اطلاعات درخواست یارانه را مشاهده کنید را مشاهده کنید
            </Typography>
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <InfoBox icon={<BiFile size={34} color='#2e7d32' />} title='درخواست' value={show?.name} bg='#eef7f0' />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiUser size={34} color='#0288d1' />}
                title='درصد تخفیف / تعداد جلسه'
                subValue={`${show?.meeting_count} جلسه`}
                value={`${show.subsidy_percentage} درصد تخفیف`}
                bg='#eef5fb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiFemale size={34} color='#ef6c00' />}
                title='زمان انقضا'
                value={show?.subsidy_expiration_date}
                // subValue={show ? show?.consultationSubsidyType?.name : ''}
                bg='#fff4eb'
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <InfoBox
                icon={<BiMoney size={34} color='#2e7d32' />}
                title='هزینه جلسه'
                value={show?.consultation_fee}
                bg='#eef7f0'
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ mt: 5, mb: 5 }}>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              علت درخواست{' '}
            </Typography>
          }
          subheader={<Typography variant='caption'>ابتدا علت درخواست یارانه مشاوره را انتخاب کنید</Typography>}
        />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 5 }}>
            <Chip
              label={`نوع ارزیابی: ${show?.consultationSubsidyStatus?.name}`}
              sx={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600
              }}
            />

            <Chip
              label={` مرکز: ${show?.evaluationInstitution ? show?.evaluationInstitution?.name : '__'}`}
              sx={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600
              }}
            />

            <Chip
              label={` ارزیابی کننده: ${show?.evaluatorUser ? show?.evaluatorUser?.first_name : '_'} `}
              sx={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                fontWeight: 600
              }}
            />
          </Box>

          <Divider sx={{ mt: 2, mb: 5 }} />

          <Grid container spacing={5} justifyContent='center' alignItems='center' textAlign='center'>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}
            >
              <FormControl component='fieldset' fullWidth>
                <Controller
                  name='consultation_subsidy_request_reason_id'
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <RadioGroup
                      row
                      value={value}
                      onChange={e => {}}
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
            title={
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                نوع ارزیابی{' '}
              </Typography>
            }
            subheader={<Typography variant='caption'>نوع ارزیابی درخواست یارانه مشاوره </Typography>}
          />
          <CardContent>
            <Grid container spacing={5} justifyContent='center' alignItems='center' textAlign='center'>
              <Grid
                item
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column'
                }}
              >
                <FormControl component='fieldset' fullWidth>
                  <Controller
                    name='consultation_subsidy_evaluation_type_id'
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                      <RadioGroup
                        row
                        value={value}
                        onChange={e => {}}
                        sx={{
                          justifyContent: 'center'
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
            </Grid>

            <Divider sx={{ mt: 2, mb: 5 }} />
            <Grid container justifyContent='center'>
              {watch('consultation_subsidy_evaluation_type_id') == 1 && (
                <Grid item xs={12} md={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                    <Typography fontWeight='700' variant='caption'>
                      شاخص های خود ارزیابی
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Controller
                      name='consultation_subsidy_criterion_ids'
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        return (
                          <Box sx={{ borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                            <Grid container>
                              {data?.consultationSubsidyCriteria?.map((item: any, idx: number) => (
                                <Grid
                                  item
                                  xs={6}
                                  key={idx}
                                  sx={{
                                    p: 2,
                                    borderBottom: '1px solid #e5e7eb',
                                    borderRight: idx % 2 === 0 ? '1px solid #e5e7eb' : 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: '0.2s',
                                    '&:hover': { backgroundColor: '#fef2f2' }
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        //@ts-ignore
                                        checked={value.includes(item.id)}
                                        onChange={() => {}}
                                      />
                                    }
                                    label={item.name}
                                  />
                                  {item.score && (
                                    <Box
                                      sx={{
                                        minWidth: 36,
                                        height: 32,
                                        borderRadius: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 800,
                                        fontSize: 14,
                                        color: '#fff',
                                        background: gradients[item.id % gradients.length]
                                      }}
                                    >
                                      {item.score}
                                    </Box>
                                  )}
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

      {show?.consultationVouchers?.length > 0 && (
        <Card sx={{ mt: 5 }}>
          <CardHeader
            sx={{ textAlign: 'center' }}
            title={
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                یاری برگ ها{' '}
              </Typography>
            }
            subheader={
              <Typography variant='caption'>
                می توانید فهرست یاری برگ های تخصیص گرفته به این درخواست یارانه را مشاهده کنید
              </Typography>
            }
          />
          <CardContent>
            <TableConsultationVouchers
              columns={[
                { label: 'مرکز', key: ['meeting'] },
                { label: 'جلسه', key: ['meeting.name'] },
                { label: 'درصد یارانه', key: ['consultationSubsidy.subsidy_percentage'] },
                { label: 'تاریخ انقضا', key: ['expires_at'] },
                { label: 'وضعیت', key: ['consultationVoucherStatus.name'] }
              ]}
              title='فهرست جلسات حضوری'
              description='می توانید فهرست جلسات حضوری را مشاهده کنید'
              rows={show?.consultationVouchers}
              isLoading={false}
              id={id}
              onOpen={() => true}
              upsertData={[]}
              disabled={false}
            />
          </CardContent>
        </Card>
      )}
    </>
  )
}
