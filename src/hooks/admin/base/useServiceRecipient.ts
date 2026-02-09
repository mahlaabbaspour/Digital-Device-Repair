import { createServiceRecipient, deleteServiceRecipient, fetchServiceRecipient, updateServiceRecipient } from "@/libs/admin/base/serviceRecipient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useServiceRecipient() {
    const { data, isLoading , isError } = useQuery({
        queryKey: ['serviceRecipient'],
        queryFn:  () => fetchServiceRecipient(),
    })

    return { data , isLoading , isError}
}


export function useCreateServiceRecipient() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createServiceRecipient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['serviceRecipient']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateServiceRecipient() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateServiceRecipient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['serviceRecipient']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useDeleteServiceRecipient() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: deleteServiceRecipient,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['serviceRecipient']})
            toast.success('با موفقیت حذف شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
