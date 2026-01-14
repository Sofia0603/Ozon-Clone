'use client';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren<unknown>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {children}
        <Toaster 
          position='top-right' 
        />
      </Provider> 
    </QueryClientProvider>
  );
}
