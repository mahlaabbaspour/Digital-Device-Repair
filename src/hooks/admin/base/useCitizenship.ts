import { createCitizenship, updateCitizenship } from "@/libs/admin/base/citizenship";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateCitizenship() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createCitizenship,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['citizenship']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateCitizenship() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateCitizenship,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['citizenship']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
