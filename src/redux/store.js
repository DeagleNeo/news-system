import { createStore, combineReducers } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { CollApsedReducer } from "./reducers/CollApsedReducer.js"
import { LadingReducer } from "./reducers/LodaingReducer.js"

// 合并 reducer
const reducer = combineReducers({
    CollApsedReducer,
    LadingReducer
});

const persistConfig = {
    key: 'xiaolin',
    storage,
    blacklist: ['LadingReducer'], // 不会被持久化的 reducer 名单
    // whitelist: ['navigation'], // 会被持久化的 reducer 名单
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export {
    store,
    persistor
};