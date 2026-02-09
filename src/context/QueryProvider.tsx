'use client'

import { ChildrenType } from "@/@core/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



export default function ConfigUseQuery({children} : ChildrenType) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
                gcTime: 5 * 60 * 1000
            }
        }
    })

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
