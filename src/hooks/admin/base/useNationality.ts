import { createNationality, updateNationality } from "@/libs/admin/base/nationality";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateNationality() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createNationality,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nationality']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateNationality() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateNationality,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nationality']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
