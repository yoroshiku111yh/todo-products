import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactDOM from 'react-dom/client'
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
)
