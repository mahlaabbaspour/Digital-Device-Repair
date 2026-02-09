import { createTargetOrganization, updateTargetOrganization } from '@/libs/admin/base/targetOrganization'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateTargetOrganization() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createTargetOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targetOrganization'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateTargetOrganization() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateTargetOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['targetOrganization'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
