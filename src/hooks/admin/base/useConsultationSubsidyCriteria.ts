import {
  createConsultationSubsidyCriteria,
  updateConsultationSubsidyCriteria
} from '@/libs/admin/base/consultationSubsidyCriteria'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateConsultationSubsidyCriteria() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createConsultationSubsidyCriteria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationSubsidyCriteria'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateConsultationSubsidyCriteria() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateConsultationSubsidyCriteria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationSubsidyCriteria'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
