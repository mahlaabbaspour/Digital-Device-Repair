import { changeStatusDocumentConsultant, updateDiagnosisAndDocument } from '@/libs/superUser/diagnosis'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useChangeDocumentConsultant() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: changeStatusDocumentConsultant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentUser'] })
      toast.success('با موفقیت مختومه شد')
    },

    onError: error => {
      toast.error('خطایی رخ داد')
    }
  })

  return { mutateAsync, isPending }
}

/////////////////////////////////////

export function useUpdateDocumentAndDiagnoisis() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, documentId }: any) => updateDiagnosisAndDocument({ data, id, documentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosis'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
