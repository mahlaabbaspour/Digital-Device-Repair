import {
  createMeetingAndDiagnosisInstitution1480,
  updateMeetingAndDiagnosisInstitution1480
} from '@/libs/superUser/institution1480'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateMeetingAndDiagnosisInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => createMeetingAndDiagnosisInstitution1480({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution1480Institution'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateMeetingAndDiagnosisInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, meetingId }: any) => updateMeetingAndDiagnosisInstitution1480({ data, id, meetingId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['institution1480Institution'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
