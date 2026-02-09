import { createClassOnlineServer, createExternalStorage, createSMSserver, updateClassOnlineServer, updateExternalStorage, updateSMSserver } from "@/libs/admin/membership/legalPersons/organization/externalServer";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify";


export function useCreateExternalStorage() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createExternalStorage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['externalServer']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}

export function useUpdateExternalStorage() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateExternalStorage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['externalServer']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useCreateSMSServer() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createSMSserver,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['externalServer']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}



export function useUpdateSMSServer() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateSMSserver,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['externalServer']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}



export function useCreateOnlineClassServer() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: createClassOnlineServer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['externalServer']})
            toast.success('با موفقیت ایجاد شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}


export function useUpdateOnlineClassServer() {

    const queryClient = useQueryClient();
    const { mutateAsync , isPending } = useMutation({
        mutationFn: updateClassOnlineServer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['externalServer']})
            toast.success('با موفقیت ویرایش شد')
        },
        onError: (error) => {
            toast.error('خطایی رخ داد')
            throw error
        }
    })

    return { mutateAsync, isPending}
}
