"use client";
import { persistor, store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import TanstackProvider from './TanstackProvider';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<></>} persistor={persistor}>
                <TanstackProvider>
                    {children}
                    <ToastContainer />
                </TanstackProvider>
            </PersistGate>
        </Provider>
    )
}

export default AppLayout