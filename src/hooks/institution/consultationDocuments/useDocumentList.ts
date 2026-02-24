'use client'

import axiosConfig from '@/libs/auth/axios'
import {
  changeStatusDocument,
  createConsultationDocuments,
  createSupervisorComment,
  createUserInstitution,
  updateConsultationDocuments,
  updateDiagnosisAndDocumentInstitution
} from '@/libs/institution/consultationDocuments/documentList'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export function useCreateUserInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUserInstitution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useCreateConsultationDocuments() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createConsultationDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentUser'] })
      toast.success('با موفقیت ایجاد شد')
      router.back()
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateConsultationDocuments() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateConsultationDocuments,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentUser'] })
      toast.success('با موفقیت ویرایش شد')
      router.back()
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useChangeDocument() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: changeStatusDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentUser'] })
      toast.success('با موفقیت انجام شد')
    },

    onError: error => {
      toast.error('خطایی رخ داد')
    }
  })

  return { mutateAsync, isPending }
}

export function useCreateSupervisorComment() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createSupervisorComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosisAndMeeting'] })
      toast.success('با موفقیت مختومه شد')
    },

    onError: error => {
      toast.error('خطایی رخ داد')
    }
  })

  return { mutateAsync, isPending }
}

////Diagnosis document institution

export function useUpdateDocumentAndDiagnoisisInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, documentId }: any) => updateDiagnosisAndDocumentInstitution({ data, id, documentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['diagnosisInstitution'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
