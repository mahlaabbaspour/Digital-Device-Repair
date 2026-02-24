import {
  createCreditAllocation,
  createSubsidyCredit,
  updateCreditAllocation,
  updateSubsidyCredit
} from '@/libs/organization/subsidyCredit/subsidyCredit'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateSubsidyCredit() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSubsidyCredit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subsidyCredit'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateSubsidyCredit() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateSubsidyCredit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subsidyCredit'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

//////CerditAlllocation////////////////

export function useCreateCreditAllocation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCreditAllocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditAllocation'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateCreditAllocation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCreditAllocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creditAllocation'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
