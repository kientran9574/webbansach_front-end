import { combineReducers, configureStore } from '@reduxjs/toolkit'
import accountSlice from './account/accountSlice'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderSlice from './order/orderSlice'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ["account"]
}

const rootReducer = combineReducers({
    account: accountSlice,
    order: orderSlice,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store)

export { store, persistor }
// export const store = configureStore({
//     reducer: {
//         account: accountSlice,
//     },
// })