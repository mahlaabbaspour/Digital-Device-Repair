import {
  createLessonEducation,
  updateCourseStatusDetermination,
  updateLessonEducation
} from '@/libs/organization/education/lesson'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateLessonEducation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLessonEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonEducation'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateLessonEducation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateLessonEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonEducation'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

////////

export function useUpdateCourseStatusDetermination() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCourseStatusDetermination,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coursePendingApproval'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
