import { createEmploymentStatus, updateEmploymentStatus } from "@/libs/admin/base/employmentStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateEmploymentStatus() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createEmploymentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employmentStatus']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateEmploymentStatus() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateEmploymentStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employmentStatus']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
