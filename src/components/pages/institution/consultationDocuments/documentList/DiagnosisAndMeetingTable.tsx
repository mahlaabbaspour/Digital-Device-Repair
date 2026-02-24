'use client'

import { useEffect, useRef, useState } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Controller, useForm } from 'react-hook-form'
import CustomAsyncAutocomplete from '@/components/elements/CustomAsyncAutocomplete'
import SubmitButton from '@/components/elements/submitButton'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { BiFile } from 'react-icons/bi'
import { BiMoney, BiUser, BiFemale } from 'react-icons/bi'
import CustomRadioIconsInstution from './CustomRadioIconsInstutition'
import SupervisorApprovalModal from './SupervisorApprovalModal'
import { useUpdateDocumentAndDiagnoisisInstitution } from '@/hooks/institution/consultationDocuments/useDocumentList'
import InfoBox from '@/components/elements/InfoBox'
import { EditorWrapper } from '@/@core/styles/react-draft-wysiwyg'
import ReactDraftWysiwyg from '@core/components/react-draft-wysiwyg'
import { dateConverter } from '@/helpers/DateHelpers'
import { convertEditorContent } from '@/helpers/EditorsHelper'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { GeTErrorFetch } from '@/components/elements/errorHandler'
import { toast } from 'react-toastify'

export default function DiagnosisAndMeetingTable({ id, documentId, show }: any) {
  console.log(show, 'show')
  const [selectedMeeting, setSelectedMeeting] = useState<any | null>(null)
  const [supervisorApproval, setSupervisorApproval] = useState(false)

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const cardWidth = (84 * 16) / 5

  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => setIsDragging(false)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const walk = (e.pageX - startX) * 1.1
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({
      left: offset,
      behavior: 'smooth'
    })
  }

  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(null)
  const [formsByMeeting, setFormsByMeeting] = useState<
    Record<
      number,
      {
        remarks: EditorState
        note: EditorState
        mental_disorder_ids: any[]
        clinical_item_ids: any[]
        clinical_diagnosis_ids: any[]
        advisor_instruction: string
      }
    >
  >({})

  const handleSelectMeeting = (meeting: any) => {
    setSelectedMeetingId(meeting.id)
  }

  const activeForm = selectedMeetingId ? formsByMeeting[selectedMeetingId] : null
  const htmlToEditorState = (html?: string | null) => {
    if (!html) return EditorState.createEmpty()

    const blocksFromHTML = convertFromHTML(html)
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)

    return EditorState.createWithContent(contentState)
  }

  useEffect(() => {
    if (!show?.consultationMeetings) return

    const mappedForms: Record<number, any> = {}

    show.consultationMeetings.forEach((meeting: any) => {
      mappedForms[meeting.id] = {
        // editor ها
        remarks: htmlToEditorState(meeting.client_remarks),
        note: htmlToEditorState(meeting.note_advisor),

        // autocomplete ها (خود آبجکت‌ها)
        mental_disorder_ids: meeting.mentalDisorders ?? [],
        clinical_diagnosis_ids: meeting.clinicalDiagnoses ?? [],
        clinical_item_ids: meeting.clinicalItems ?? [],

        // textfield
        advisor_instruction: meeting.advisor_instruction ?? ''
      }
    })

    setFormsByMeeting(mappedForms)
  }, [show?.consultationMeetings])

  useEffect(() => {
    if (!selectedMeetingId) return
    const formData: any = formsByMeeting[selectedMeetingId]
    if (!formData) return

    setRemarks(formData.remarks)
    setNote(formData.note)
    setValue('mental_disorder_ids', formData.mental_disorder_ids)
    setValue('clinical_diagnosis_ids', formData.clinical_diagnosis_ids)
    setValue('clinical_item_ids', formData.clinical_item_ids)
    setValue('advisor_instruction', formData.advisor_instruction)
  }, [selectedMeetingId, formsByMeeting])

  const {
    control,
    setError,
    watch,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      psychotherapy_history: 0,
      psychiatric_hospitalization_history: 0,
      psychiatric_medication_history: 0,
      hospitalization_duration: '',
      medication_history: '',
      specific_disease_type: 0,
      specific_disease_type_history: '',
      past_medical_history: '',
      personal_history: '',
      mental_status_history: '',
      history_interventions: '',
      suicide_history: 0,
      client_remarks: null,
      note_advisor: '',
      advisor_instruction: '',
      mental_disorder_ids: [],
      clinical_item_ids: [],
      clinical_diagnosis_ids: []
    }
  })

  useEffect(() => {
    if (show) {
      setValue('psychotherapy_history', Number(show?.psychotherapy_history))
      setValue('psychiatric_hospitalization_history', Number(show?.psychiatric_hospitalization_history))
      setValue('psychiatric_medication_history', Number(show?.psychiatric_medication_history))
      setValue('hospitalization_duration', show?.hospitalization_duration)
      setValue('medication_history', show?.medication_history)
      setValue('specific_disease_type', Number(show?.specific_disease_type))
      setValue('specific_disease_type_history', show?.specific_disease_type_history)
      setValue('suicide_history', Number(show?.suicide_history))
      setValue('past_medical_history', show?.past_medical_history)
      setValue('personal_history', show?.personal_history)
      setValue('mental_status_history', show?.mental_status_history)
      setValue('history_interventions', show?.history_interventions)
    }
  }, [show])

  const { mutateAsync: updateDocument, isPending: isLoadingDocument } = useUpdateDocumentAndDiagnoisisInstitution()

  async function onSubmit(values: any) {
    try {
      const test1 = convertEditorContent(remarks)
      const test2 = convertEditorContent(note)
      const result: any = {}
      Object.entries(values).forEach(([key, value]) => {
        if (value && typeof value === 'object' && 'id' in value) {
          result[key] = value?.id
        } else if (Array.isArray(value)) {
          result[key] = value.map((item: any) => (typeof item === 'object' && 'id' in item ? item?.id : item))
        } else if (value instanceof Date) {
          result[key] = dateConverter(value)
        } else {
          result[key] = value
        }
      })
      const data = {
        ...result,
        client_remarks: test1,
        note_advisor: test2,
        meeting_id: selectedMeetingId
      }

      const res = await toast.promise(updateDocument({ data: data, id: id, documentId: documentId }), {
        pending: 'در حال انجام...'
      })
    } catch (error) {
      GeTErrorFetch({ error, setError })
    }
  }

  const [remarks, setRemarks] = useState(EditorState.createEmpty())
  const [note, setNote] = useState(EditorState.createEmpty())

  return (
    <>
      <SupervisorApprovalModal
        id={id}
        open={supervisorApproval}
        onClose={() => setSupervisorApproval(false)}
        selectedRow={selectedMeeting}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Card
          sx={{
            width: '84rem'
          }}
        >
          <CardHeader
            sx={{ textAlign: 'center', pb: 1, mb: 5 }}
            title={
              <Typography variant='h6' fontWeight={800}>
                اطلاعات پرونده
              </Typography>
            }
            subheader={
              <Typography variant='caption' color='text.secondary'>
                می توانید اطلاعات پرونده را مشاهده کنید
              </Typography>
            }
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <InfoBox
                  icon={<BiFile size={34} color='#2e7d32' />}
                  title='شماره پرونده'
                  value={show?.document_number}
                  bg='#eef7f0'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <InfoBox
                  icon={<BiUser size={34} color='#0288d1' />}
                  title='گیرنده خدمت'
                  value={`${show?.first_name} ${show?.last_name}`}
                  bg='#eef5fb'
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <InfoBox
                  icon={<BiFemale size={34} color='#ef6c00' />}
                  title='مشاور'
                  value={'__'}
                  subValue={show ? show?.consultationSubsidyType?.name : ''}
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
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Card sx={{ mt: 10, position: 'relative', width: '84rem' }}>
            <CardHeader
              sx={{ textAlign: 'center', pb: 1, mb: 5 }}
              title={
                <Typography variant='h6' fontWeight={800}>
                  سابقه مراجع
                </Typography>
              }
              subheader={
                <Typography variant='caption' color='text.secondary'>
                  ابتدا سابقه کلی مراجع را تکمیل کنید
                </Typography>
              }
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                  width: '100%'
                }}
              >
                <Box sx={{ flex: 6 }}>
                  <Grid container spacing={5}>
                    {/* suicide_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='psychotherapy_history'
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormControlLabel
                            label='سابقه روان درمانی'
                            control={
                              <Switch
                                checked={field.value === 1}
                                onChange={(_, check) => field.onChange(check ? 1 : 0)}
                              />
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* psychiatric_hospitalization_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='psychiatric_hospitalization_history'
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormControlLabel
                            label='سابقه بستری به دلیل مشکلات روان پزشکی'
                            control={
                              <Switch
                                checked={field.value === 1}
                                onChange={(_, check) => field.onChange(check ? 1 : 0)}
                              />
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* hospitalization_duration */}
                    {watch('psychiatric_hospitalization_history') == 1 && (
                      <>
                        <Grid item xs={12}>
                          <Controller
                            name='hospitalization_duration'
                            control={control}
                            defaultValue=''
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                InputProps={{ readOnly: false }}
                                {...field}
                                value={field.value ?? ''}
                                fullWidth
                                label='مدت زمان بستری'
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={4}></Grid>
                      </>
                    )}

                    {/* psychiatric_medication_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='psychiatric_medication_history'
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                          <FormControlLabel
                            label='سابقه مصرف داروهای روانپزشکی'
                            control={
                              <Switch
                                checked={field.value === 1}
                                onChange={(_, check) => field.onChange(check ? 1 : 0)}
                              />
                            }
                          />
                        )}
                      />
                    </Grid>

                    {/* medication_type */}
                    {watch('psychiatric_medication_history') == 1 && (
                      <>
                        <Grid item xs={12}>
                          <Controller
                            name='medication_history'
                            control={control}
                            defaultValue=''
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                InputProps={{ readOnly: false }}
                                {...field}
                                value={field.value ?? ''}
                                fullWidth
                                label='نوع دارو'
                              />
                            )}
                          />
                        </Grid>
                      </>
                    )}

                    {/* specific_disease_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='specific_disease_type'
                        control={control}
                        defaultValue={0}
                        render={({ field: { value, onChange } }) => (
                          <FormControlLabel
                            label='سابقه بیماری خاص'
                            control={<Switch checked={value === 1} onChange={(_, check) => onChange(check ? 1 : 0)} />}
                          />
                        )}
                      />
                    </Grid>

                    {/* specific_disease_type */}
                    {watch('specific_disease_type') == 1 && (
                      <>
                        <Grid item xs={12}>
                          <Controller
                            name='specific_disease_type_history'
                            control={control}
                            defaultValue=''
                            render={({ field, fieldState: { error } }) => (
                              <TextField
                                error={!!error}
                                helperText={error?.message}
                                InputProps={{ readOnly: false }}
                                {...field}
                                value={field.value ?? ''}
                                fullWidth
                                label='نوع بیماری خاص'
                              />
                            )}
                          />
                        </Grid>
                      </>
                    )}

                    {/* suicide_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='suicide_history'
                        control={control}
                        defaultValue={0}
                        render={({ field: { value, onChange } }) => (
                          <FormControlLabel
                            label='سابقه خودکشی'
                            control={<Switch checked={value === 1} onChange={(_, check) => onChange(check ? 1 : 0)} />}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{
                    borderColor: '#dbdbdbff',
                    mx: 5
                  }}
                />

                <Box sx={{ flex: 6 }}>
                  <Grid container spacing={5}>
                    {/* past_medical_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='past_medical_history'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ readOnly: false }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            value={field.value ?? ''}
                            fullWidth
                            label='تاریخچه بیماری های قبلی'
                          />
                        )}
                      />
                    </Grid>

                    {/* personal_histroy */}
                    <Grid item xs={12}>
                      <Controller
                        name='personal_history'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ readOnly: false }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            value={field.value ?? ''}
                            fullWidth
                            label='تاریخچه شخصی'
                          />
                        )}
                      />
                    </Grid>

                    {/* mental_status */}
                    <Grid item xs={12}>
                      <Controller
                        name='mental_status_history'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ readOnly: false }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            value={field.value ?? ''}
                            fullWidth
                            label='وضعیت روانی'
                          />
                        )}
                      />
                    </Grid>

                    {/* interventions_description */}
                    <Grid item xs={12}>
                      <Controller
                        name='history_interventions'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ readOnly: false }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            value={field.value ?? ''}
                            fullWidth
                            label='شرح مداخلات'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <Card sx={{ mt: 10, position: 'relative', width: '84rem' }}>
            <CardContent sx={{ position: 'relative' }}>
              <IconButton
                onClick={() => scrollBy(-cardWidth)}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 2
                }}
              >
                <MdChevronLeft />
              </IconButton>
              <Box
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                sx={{
                  display: 'flex',
                  gap: 4,
                  overflowX: 'auto',
                  px: 6,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' }
                }}
              >
                {show?.consultationMeetings?.map((item: any) => (
                  <Box
                    key={item.id}
                    sx={{
                      flex: '0 0 calc((84rem - 4 * 16px) / 5)'
                    }}
                    onClick={() => {
                      handleSelectMeeting(item)
                    }}
                  >
                    <CustomRadioIconsInstution
                      data={item}
                      name='custom-radios'
                      icon='mdi:calendar-clock-outline'
                      selected={selectedMeeting?.id}
                      handleChange={() => setSelectedMeeting(item)}
                      setSupervisorApproval={setSupervisorApproval}
                    />
                    {/* <CustomRadioIcons
                      data={item}
                      name='custom-radios'
                      icon='mdi:calendar-clock-outline'
                      selected={selectedRadio}
                      handleChange={handleRadioChange}
                    /> */}
                  </Box>
                ))}
              </Box>

              <IconButton
                onClick={() => scrollBy(cardWidth)}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                  bgcolor: 'background.paper',
                  boxShadow: 2
                }}
              >
                <MdChevronRight />
              </IconButton>
            </CardContent>
          </Card>
        </Box>

        {activeForm && (
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box sx={{ mt: 5, width: '84rem' }}>
              <Card>
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <EditorWrapper>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <Chip
                            label='اظهارات مراجع'
                            sx={{
                              backgroundColor: '#e0f2fe',
                              color: '#0369a1',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                        <ReactDraftWysiwyg
                          toolbar={{
                            fontFamily: {
                              options: [
                                'Arial',
                                'Georgia',
                                'Impact',
                                'Tahoma',
                                'Times New Roman',
                                'Verdana',
                                'b nazanin',
                                'b lotus',
                                'b mitra',
                                'IRANSans'
                              ]
                            }
                          }}
                          editorState={remarks}
                          onEditorStateChange={editorState => {
                            setRemarks(editorState)
                          }}
                        />
                      </EditorWrapper>
                    </Grid>

                    <Grid item xs={12}>
                      <EditorWrapper>
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <Chip
                            label='یادداشت های مشاور'
                            sx={{
                              backgroundColor: '#fef0e0ff',
                              color: '#a18903ff',
                              fontWeight: 600
                            }}
                          />
                        </Box>
                        <ReactDraftWysiwyg
                          toolbar={{
                            fontFamily: {
                              options: [
                                'Arial',
                                'Georgia',
                                'Impact',
                                'Tahoma',
                                'Times New Roman',
                                'Verdana',
                                'b nazanin',
                                'b lotus',
                                'b mitra',
                                'IRANSans'
                              ]
                            }
                          }}
                          editorState={note}
                          onEditorStateChange={editorState => {
                            setNote(editorState)
                          }}
                        />
                      </EditorWrapper>
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Controller
                        name='clinical_diagnosis_ids'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/institution/${id}/inPerson-consultation/base/select/clinical-diagnosis`}
                            readOnly={false}
                            onAddValue={newValue => onChange(newValue)}
                            value={value || []}
                            getOptionLabel={optien => optien?.name}
                            label='تشخیص های بالینی'
                            multiple={true}
                            error={!!error}
                            helperText={error?.message}
                          ></CustomAsyncAutocomplete>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Controller
                        name='mental_disorder_ids'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/institution/${id}/inPerson-consultation/base/select/mental-disorder`}
                            readOnly={false}
                            onAddValue={newValue => onChange(newValue)}
                            value={value || []}
                            getOptionLabel={optien => optien?.name}
                            label='تشخیص های رسمی (DSM5)'
                            multiple={true}
                            error={!!error}
                            helperText={error?.message}
                          ></CustomAsyncAutocomplete>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Controller
                        name='clinical_item_ids'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                          <CustomAsyncAutocomplete
                            url={`/institution/${id}/inPerson-consultation/base/select/clinical-item`}
                            readOnly={false}
                            onAddValue={newValue => onChange(newValue)}
                            value={value || []}
                            getOptionLabel={optien => optien?.name}
                            label='ابزار ها و تکنیک های مشاوره'
                            multiple={true}
                            error={!!error}
                            helperText={error?.message}
                          ></CustomAsyncAutocomplete>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name='advisor_instruction'
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            multiline
                            rows={3}
                            InputProps={{ readOnly: false }}
                            error={!!error}
                            helperText={error?.message}
                            {...field}
                            value={field.value ?? ''}
                            fullWidth
                            label='دستورات مشاور'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', mt: 5, mr: 8 }}>
          <SubmitButton disabled={isLoadingDocument} />
        </Box>
      </form>
    </>
  )
}
