import React from "react";
import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {PersistConfig, persistReducer, persistStore} from "redux-persist";
import {rootReducer, RootState} from "./rootReducer";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setLanguage} from "~/common/localization/localization";
import {createLogger, ReduxLoggerOptions} from "redux-logger";
import {authorizationApi} from "~/core/store/api/auth/authQuery";
import {authErrorLogger} from "~/core/store/api/auth/authErrorLogger";
import {advertisementApi} from "~/core/store/api/ad/adQuery";

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage: AsyncStorage,
    version: 1,
    timeout: 1000,
    blacklist: ["filter"]
};

const options: ReduxLoggerOptions = {
    diff: true,
    collapsed: true,
    predicate: (): boolean => {
        return __DEV__;
    },
};
const logger = createLogger(options);

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
            .concat(logger)
            .concat(authorizationApi.middleware)
            .concat(authErrorLogger)
            .concat(advertisementApi.middleware)
});

export const persistor = persistStore(
    store,
    undefined,
    async () => {
        const state: RootState = store.getState();
        await setLanguage(state.system.language);
    }
);

type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const reduxProvider = (Component: any) => (props: any) => {
    return (
        <Provider store={store}>
            <PersistGate
                loading={null} persistor={persistor}
                onBeforeLift={async () => setLanguage(store.getState().system.language)}
            >
                <Component {...props} />
            </PersistGate>
        </Provider>
    );
};
