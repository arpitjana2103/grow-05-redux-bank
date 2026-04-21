import { useReducer } from "react";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

const reducer = function (state, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, balance: state.balance + action.payload };
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload };
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose };
        case "account/payLoan":
            return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };

        default:
            return state;
    }
};

const CitiesProvider = function ({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    dispatch({ type: "account/deposit", payload: 100 });
    return <>{children}</>;
};
