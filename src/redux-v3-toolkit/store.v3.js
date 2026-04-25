import { configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./accountSlice.v3";
import { customerReducer } from "./customerSlice.v3";

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer,
    },
});

export default store;
