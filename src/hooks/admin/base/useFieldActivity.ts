import { createFieldActivity, updateFieldActivity } from "@/libs/admin/base/feildActivity";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateFieldActivity() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createFieldActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fieldActivity']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateFieldActivity() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateFieldActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fieldActivity']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
