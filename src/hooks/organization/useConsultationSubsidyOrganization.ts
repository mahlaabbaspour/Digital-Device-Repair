import axiosConfig from '@/libs/auth/axios'
import { createEvaluationOrganization } from '@/libs/organization/consultationSubsidy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateEvaluationOrganization() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, evaluationId }: any) => createEvaluationOrganization({ data, id, evaluationId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluationOrganization'] })
      toast.success('با موفقیت ثبت شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////////////////////Consultation Document/////////////

export const useFetchDocumentConsultationOrganiation = ({ params, id }: any) => {
  return useQuery({
    queryKey: ['documentConsultation', params],
    queryFn: async () => {
      const res = await axiosConfig.get(`/organization/${id}/inPerson-consultation/core/inPerson-consultation/`, {
        params: params
      })
      return res.data?.data
    }
  })
}

/////////////////////Consultation Meeting/////////////

export const useFetchMeetingConsultationOrganiation = ({ params, id }: any) => {
  return useQuery({
    queryKey: ['documentConsultation', params],
    queryFn: async () => {
      const res = await axiosConfig.get(`/organization/${id}/meeting/core/consultation-meeting/`, {
        params: params
      })
      return res.data?.data
    }
  })
}
