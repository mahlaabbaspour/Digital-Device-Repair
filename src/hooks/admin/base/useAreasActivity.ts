import { createAreasActivity, updateAreasActivity } from "@/libs/admin/base/areasActivity";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateAreasActivity() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createAreasActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['areasActivity']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateAreasActivity() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateAreasActivity,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['areasActivity']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
