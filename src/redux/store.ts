import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import RootReducer from './slices';
import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: 'cart',
    storage,
    stateReconsiler: autoMergeLevel2,
};

const appReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
    reducer: appReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };