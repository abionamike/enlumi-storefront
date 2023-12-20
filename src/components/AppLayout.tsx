"use client";
import { persistor, store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import TanstackProvider from './TanstackProvider';
import OutsideCallConsumer, { createCaller } from 'react-outside-call';
import { Suspense } from 'react';
import { useAppDispatch, useAppSelector } from '@/hook/useRedux';

export const callConfig = createCaller({
    // eslint-disable-next-line react-hooks/rules-of-hooks
    state: () => useAppSelector((state) => state),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dispatch: () => useAppDispatch(),
});

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={<></>} persistor={persistor}>
                <TanstackProvider>
                    <OutsideCallConsumer config={callConfig}>
                        <Suspense>
                            {children}
                            <div id="modals-container"></div>
                        </Suspense>
                    </OutsideCallConsumer>
                    <ToastContainer />
                </TanstackProvider>
            </PersistGate>
        </Provider>
    )
}

export default AppLayout