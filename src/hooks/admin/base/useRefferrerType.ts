import { createRefferrerType, updateRefferrerType } from "@/libs/admin/base/refferrerType";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateRefferrerType() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createRefferrerType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['refferrerType']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateRefferrerType() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateRefferrerType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['refferrerType']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
