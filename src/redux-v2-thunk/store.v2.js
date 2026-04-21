import { applyMiddleware } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { accountReducer } from "../redux-v2/accountSlice.v1";
import { customerReducer } from "../redux-v1/customerSlice.v1";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
