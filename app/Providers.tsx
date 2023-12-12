'use client';
import React, { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider, atom } from 'jotai';
import { NavermapsProvider } from 'react-naver-maps';
import Naver from 'next-auth/providers/naver';
interface CombinedProviderProps {
    children: ReactNode;
    session: any;
}

const Provider: React.FC<CombinedProviderProps> = ({ children, session }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                staleTime: 30 * 1000,
                gcTime: 10 * 60 * 1000,
            },
        },
    }));
    return (
        <JotaiProvider>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <NavermapsProvider ncpClientId={process.env.NEXT_PUBLIC_NCP_MAP_CLIENT_ID}>
                        {children}
                    </NavermapsProvider>
                </QueryClientProvider>
            </SessionProvider>
        </JotaiProvider>
    );
};

export default Provider;