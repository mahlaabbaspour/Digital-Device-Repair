import {
  createConsultationSubsidyInstitution,
  createEvaluationInstitution
} from '@/libs/institution/consultationServices/consultationSubsidy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateConsultationSubsidyInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => createConsultationSubsidyInstitution({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationSubsidyInstitution'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useCreateEvaluationInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, evaluationId }: any) => createEvaluationInstitution({ data, id, evaluationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationSubsidyInstitution'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
