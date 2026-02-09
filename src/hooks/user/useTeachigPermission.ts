import axiosConfig from '@/libs/auth/axios'
import {
  createHistoryComposingTeachingPermission,
  createHistoryEducationTeachingPermission,
  createHistoryStudyTeachingPermission,
  createHistoryTeachingTeachingPermission,
  createTeachingPermission,
  deleteHistoryComposingTeachingPermission,
  deleteHistoryEducationTeachingPermission,
  deleteHistoryStudyTeachingPermission,
  deleteHistoryTeachingTeachingPermission,
  objectionTeachingPermission,
  updateHistoryComposingTeachingPermission,
  updateHistoryEducationTeachingPermission,
  updateHistoryStudyTeachingPermission,
  updateHistoryTeachingTeachingPermission,
  updateTeachingPermission
} from '@/libs/user/teachigPermission'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => createTeachingPermission({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestListTeaching'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId }: any) => updateTeachingPermission({ data, id, teachId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestListTeaching'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useObjectionTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId }: any) => objectionTeachingPermission({ data, id, teachId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requestListTeaching'] })
      toast.success('با موفقیت ثبت شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///////History Study

export const useFetchHistoryStudyTeachingPermission = ({ id, teachId }: { id: string; teachId: string }) => {
  return useQuery({
    queryKey: ['historyStudy'],
    enabled: !!id && !!teachId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/user/${id}/education/request-teaching-permission/core/request-teaching-permission/${teachId}/study-history`
      )
      return res.data?.data
    }
  })
}

export function useCreateHistoryStudyTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId }: any) => createHistoryStudyTeachingPermission({ data, id, teachId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyStudy'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateHistoryStudyTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId, rowId }: any) =>
      updateHistoryStudyTeachingPermission({ data, id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyStudy'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteHistoryStudyTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, teachId, rowId }: any) => deleteHistoryStudyTeachingPermission({ id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyStudy'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////History Education
export const useFetchHistoryEducationTeachingPermission = ({ id, teachId }: { id: string; teachId: string }) => {
  return useQuery({
    queryKey: ['historyEducation'],
    enabled: !!id && !!teachId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/user/${id}/education/request-teaching-permission/core/request-teaching-permission/${teachId}/education-history`
      )
      return res.data?.data
    }
  })
}

export function useCreateHistoryEducationTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId }: any) => createHistoryEducationTeachingPermission({ data, id, teachId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyEducation'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateHistoryEducationTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId, rowId }: any) =>
      updateHistoryEducationTeachingPermission({ data, id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyEducation'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteHistoryEducationTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, teachId, rowId }: any) => deleteHistoryEducationTeachingPermission({ id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyEducation'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////History Teaching
export const useFetchHistoryTeachingTeachingPermission = ({ id, teachId }: { id: string; teachId: string }) => {
  return useQuery({
    queryKey: ['historyTeaching'],
    enabled: !!id && !!teachId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/user/${id}/education/request-teaching-permission/core/request-teaching-permission/${teachId}/teaching-history`
      )
      return res.data?.data
    }
  })
}

export function useCreateHistoryTeachingTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId }: any) => createHistoryTeachingTeachingPermission({ data, id, teachId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyTeaching'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateHistoryTeachingTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId, rowId }: any) =>
      updateHistoryTeachingTeachingPermission({ data, id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyTeaching'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteHistoryTeachingTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, teachId, rowId }: any) => deleteHistoryTeachingTeachingPermission({ id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyTeaching'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////History Education
export const useFetchHistoryComposingTeachingPermission = ({ id, teachId }: { id: string; teachId: string }) => {
  return useQuery({
    queryKey: ['historyComposing'],
    enabled: !!id && !!teachId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/user/${id}/education/request-teaching-permission/core/request-teaching-permission/${teachId}/composing-history`
      )
      return res.data?.data
    }
  })
}

export function useCreateHistoryComposingTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId }: any) => createHistoryComposingTeachingPermission({ data, id, teachId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyComposing'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateHistoryComposingTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, teachId, rowId }: any) =>
      updateHistoryComposingTeachingPermission({ data, id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyComposing'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteHistoryComposingTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, teachId, rowId }: any) => deleteHistoryComposingTeachingPermission({ id, teachId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyComposing'] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
