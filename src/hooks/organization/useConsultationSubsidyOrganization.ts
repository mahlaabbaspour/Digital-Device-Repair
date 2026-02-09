import { createEvaluationOrganization } from '@/libs/organization/consultationSubsidy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateEvaluationOrganization() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, evaluationId }: any) => createEvaluationOrganization({ data, id, evaluationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluationOrganization'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
