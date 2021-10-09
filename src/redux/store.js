import { createStore, combineReducers } from "redux"
import { CollApsedReducer } from "./reducers/CollApsedReducer.js"
import { LadingReducer } from "./reducers/LodaingReducer.js"

// 合并 reducer
const reducer = combineReducers({
    CollApsedReducer,
    LadingReducer
});

const store = createStore(reducer);

export default store;