import {
  createMeetingAndDiagnosisInstitution1480Institution,
  updateMeetingAndDiagnosisInstitution1480Institution
} from '@/libs/institution/institution1480/institution1480Institution'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateMeetingAndDiagnosisInstitution1480() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => createMeetingAndDiagnosisInstitution1480Institution({ data, id }),
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

export function useUpdateMeetingAndDiagnosisInstitution1480() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, meetingId }: any) =>
      updateMeetingAndDiagnosisInstitution1480Institution({ data, id, meetingId }),
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
