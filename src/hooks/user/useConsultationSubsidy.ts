import { createConsultationSubsidy } from '@/libs/user/consultationSubsidy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateConsultationSubsidy() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => createConsultationSubsidy({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['consultationSubsidy'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
