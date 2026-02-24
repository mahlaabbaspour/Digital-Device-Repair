import axiosConfig from '@/libs/auth/axios'
import {
  createChapterCourseInstitution,
  createCourseStudentInstitution,
  createExamCourseInstitution,
  createFileCourseStudentInstitution,
  createInPersonMeetingCourseInstitution,
  createLessonEducationalInstitution,
  createOnlineMeetingCourseInstitution,
  createResourceCourseInstitution,
  deleteChapterCourseInstitution,
  deleteCourseStudentInstitution,
  deleteExamCourseInstitution,
  deleteFileCourseInstitution,
  deleteInPersonMeetingCourseInstitution,
  deleteOnlineMeetingCourseInstitution,
  deleteResourceCourseInstitution,
  requestPermissionHoldCourse,
  updateChapterCourseInstitution,
  updateCourseStudentInstitution,
  updateExamCourseInstitution,
  updateInPersonMeetingCourseInstitution,
  updateLessonEducationalInstitution,
  updateOnlineMeetingCourseInstitution,
  updateResourceCourseInstitution
} from '@/libs/institution/education/lessonEducation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export function useCreateLessonEducation() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => createLessonEducationalInstitution({ data, id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educationalCourse'] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateLessonEducationInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => updateLessonEducationalInstitution({ data, id, courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educationalCourse'] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

/////

export function useRequestPermissionHoldCourse() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, rowId }: any) => requestPermissionHoldCourse({ data, id, rowId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['educationalCourse'] })
      toast.success('با موفقیت ثبت شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///////////////////Chapter Course///////////////////////

export const useFetchChapterCourseInstitution = ({ id, courseId }: { id: string; courseId: string }) => {
  return useQuery({
    queryKey: ['chaptersInstitution', id, courseId],
    enabled: !!id && !!courseId,
    queryFn: async () => {
      const res = await axiosConfig.get(`/institution/${id}/education/course/core/course/${courseId}/chapter`)
      return res.data?.data
    }
  })
}

export function useCreateChapterCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => createChapterCourseInstitution({ data, id, courseId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['chaptersInstitution', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateChapterCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => updateChapterCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['chaptersInstitution', id, courseId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteChapterCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => deleteChapterCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['chaptersInstitution', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///////////////Resouce course/////////////

export function useCreateResourceCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, chapterId }: any) =>
      createResourceCourseInstitution({ data, id, courseId, chapterId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['chaptersInstitution', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateResourceCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, chapterId, rowId }: any) =>
      updateResourceCourseInstitution({ data, id, courseId, chapterId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['chaptersInstitution', id, courseId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteResourceCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, chapterId, rowId }: any) =>
      deleteResourceCourseInstitution({ data, id, courseId, chapterId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['chaptersInstitution', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

////////////File Course/////////////

export const useFetchFileCourseStudentInstitution = ({ id, courseId }: { id: string; courseId: string }) => {
  return useQuery({
    queryKey: ['filesCourse', id, courseId],
    enabled: !!id && !!courseId,
    queryFn: async () => {
      const res = await axiosConfig.get(`/institution/${id}/education/course/core/course/${courseId}/file/`)
      return res.data?.data
    }
  })
}

export function useCreateFileCourseStudentInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => createFileCourseStudentInstitution({ data, id, courseId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['filesCourse', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteFileCourseStudentInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => deleteFileCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['filesCourse', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

////////////InPesonMeeting Course/////////////

export const useFetchInPersonMeetingCourseInstitution = ({ id, courseId }: { id: string; courseId: string }) => {
  return useQuery({
    queryKey: ['inPersonMeeting', id, courseId],
    enabled: !!id && !!courseId,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/institution/${id}/education/course/core/course/${courseId}/in-person-training-meeting`
      )
      return res.data?.data
    }
  })
}

export function useCreateInPersonMeetingCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => createInPersonMeetingCourseInstitution({ data, id, courseId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['inPersonMeeting', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateInPersonMeetingCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) =>
      updateInPersonMeetingCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['inPersonMeeting', id, courseId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteInPersonMeetingCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) =>
      deleteInPersonMeetingCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['inPersonMeeting', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///////////////OnlineMeeting Course//////////

export const useFetchOnlineMeetingCourseInstitution = ({ id, courseId }: { id: string; courseId: string }) => {
  return useQuery({
    queryKey: ['onlineMeeting', id, courseId],
    enabled: !!id && !!courseId,
    queryFn: async () => {
      const res = await axiosConfig.get(
        `/institution/${id}/education/course/core/course/${courseId}/online-training-meeting`
      )
      return res.data?.data
    }
  })
}

export function useCreateOnlineMeetingCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => createOnlineMeetingCourseInstitution({ data, id, courseId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['onlineMeeting', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateOnlineMeetingCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) =>
      updateOnlineMeetingCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['onlineMeeting', id, courseId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteOnlineMeetingCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) =>
      deleteOnlineMeetingCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['onlineMeeting', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///////////////OnlineMeeting Course//////////

export const useFetchExamCourseInstitution = ({ id, courseId }: { id: string; courseId: string }) => {
  return useQuery({
    queryKey: ['examCourse', id, courseId],
    enabled: !!id && !!courseId,
    queryFn: async () => {
      const res = await axiosConfig.get(`/institution/${id}/education/course/core/course/${courseId}/exam`)
      return res.data?.data
    }
  })
}

export function useCreateExamCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => createExamCourseInstitution({ data, id, courseId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['examCourse', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateExamCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => updateExamCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['examCourse', id, courseId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteExamCourseInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => deleteExamCourseInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['examCourse', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

///////////////CourseStudent Institution//////////

export const useFetchCourseStudentInstitution = ({ id, courseId }: { id: string; courseId: string }) => {
  return useQuery({
    queryKey: ['courseStudent', id, courseId],
    enabled: !!id && !!courseId,
    queryFn: async () => {
      const res = await axiosConfig.get(`/institution/${id}/education/course/core/course/${courseId}/course-student`)
      return res.data?.data
    }
  })
}

export function useCreateCourseStudentInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId }: any) => createCourseStudentInstitution({ data, id, courseId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['courseStudent', id, courseId] })
      toast.success('با موفقیت ایجاد شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useUpdateCourseStudentInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => updateCourseStudentInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['courseStudent', id, courseId] })
      toast.success('با موفقیت ویرایش شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}

export function useDeleteCourseStudentInstitution() {
  const queryClient = useQueryClient()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ data, id, courseId, rowId }: any) => deleteCourseStudentInstitution({ data, id, courseId, rowId }),
    onSuccess: (_, variables) => {
      const { id, courseId } = variables
      queryClient.invalidateQueries({ queryKey: ['courseStudent', id, courseId] })
      toast.success('با موفقیت حذف شد')
    },
    onError: error => {
      toast.error('خطایی رخ داد')
      throw error
    }
  })

  return { mutateAsync, isPending }
}
