import { combineReducers, createStore } from "redux";
import { accountReducer } from "./accountSlice.v1";
import { customerReducer } from "./customerSlice.v1";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

export const store = createStore(rootReducer);

// store.dispatch(deposit(500));
// store.dispatch(withdraw(200));
// console.log(store.getState());

// store.dispatch(requestLoan(1000, "Buy a cheap car"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

// store.dispatch(createCustomer("Jonas Schmedtmann", "24343434"));
// store.dispatch(deposit(250));
// console.log(store.getState());
