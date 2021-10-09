import { createStore, combineReducers } from "redux"
import { CollApsedReducer } from "./reducers/CollApsedReducer.js"

// 合并 reducer
const reducer = combineReducers({
    CollApsedReducer
});

const store = createStore(reducer);

export default store;