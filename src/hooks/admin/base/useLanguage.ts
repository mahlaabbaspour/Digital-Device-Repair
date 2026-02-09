import { createLanguage, updateLanguage } from "@/libs/admin/base/language";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateLanguage() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createLanguage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['language']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateLanguage() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateLanguage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['language']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
