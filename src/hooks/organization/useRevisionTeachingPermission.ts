import axiosConfig from '@/libs/auth/axios'
import {
  processObjectionTeachingPermissionReject,
  updateHistoryComposingRevisionTeachingPermission,
  updateHistoryEducationRevisionTeachingPermission,
  updateHistoryStudyRevisionTeachingPermission,
  updateHistoryTeachingRevisionTeachingPermission,
  updateTeachingPermissionRevision
} from '@/libs/organization/teachigPermission/revision'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useUpdateTeachingPermissionRevision() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, revisionId }: any) => updateTeachingPermissionRevision({ data, id, revisionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TeachingPermissionRevision'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useProcessObjectionTeachingPermissionRevision() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, revisionId }: any) => processObjectionTeachingPermissionReject({ data, id, revisionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['TeachingPermissionRevision'] })
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
export const useFetchHistoryStudyRevisionTeachingPermission = ({
  id,
  revisionId
}: {
  id: string
  revisionId: string
}) => {
  return useQuery({
    queryKey: ['historyStudyRevision'],
    enabled: !!id && !!revisionId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/organization/${id}/education/request-teaching-permission/core/request-teaching-permission/${revisionId}/study-history/`
      )
      return res.data?.data
    }
  })
}

export function useUpdateHistoryStudyRevisionTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, revisionId, rowId }: any) =>
      updateHistoryStudyRevisionTeachingPermission({ data, id, revisionId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyStudyRevision'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
/////History Education
export const useFetchHistoryEducationRevisionTeachingPermission = ({
  id,
  revisionId
}: {
  id: string
  revisionId: string
}) => {
  return useQuery({
    queryKey: ['historyEducationRevision'],
    enabled: !!id && !!revisionId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/organization/${id}/education/request-teaching-permission/core/request-teaching-permission/${revisionId}/education-history/`
      )
      return res.data?.data
    }
  })
}

export function useUpdateHistoryEducationRevisionTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, revisionId, rowId }: any) =>
      updateHistoryEducationRevisionTeachingPermission({ data, id, revisionId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyEducationRevision'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////History Teaching
export const useFetchHistoryTeachingRevisionTeachingPermission = ({
  id,
  revisionId
}: {
  id: string
  revisionId: string
}) => {
  return useQuery({
    queryKey: ['historyTeachingRevision'],
    enabled: !!id && !!revisionId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/organization/${id}/education/request-teaching-permission/core/request-teaching-permission/${revisionId}/teaching-history/`
      )
      return res.data?.data
    }
  })
}

export function useUpdateHistoryTeachingRevisionTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, revisionId, rowId }: any) =>
      updateHistoryTeachingRevisionTeachingPermission({ data, id, revisionId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyTeachingRevision'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////History Education
export const useFetchHistoryComposingRevisionTeachingPermission = ({
  id,
  revisionId
}: {
  id: string
  revisionId: string
}) => {
  return useQuery({
    queryKey: ['historyComposingRevision'],
    enabled: !!id && !!revisionId,
    refetchInterval: 2000,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/organization/${id}/education/request-teaching-permission/core/request-teaching-permission/${revisionId}/composing-history/`
      )
      return res.data?.data
    }
  })
}

export function useUpdateHistoryComposingRevisionTeachingPermission() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, revisionId, rowId }: any) =>
      updateHistoryComposingRevisionTeachingPermission({ data, id, revisionId, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['historyComposingRevision'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
