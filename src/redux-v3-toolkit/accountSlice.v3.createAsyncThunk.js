import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deposit = createAsyncThunk("account/deposit", async function ({ amount, currency }) {
    if (currency === "USD") return amount;

    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
    const data = await res.json();
    const converted = data.rates.USD;
    return converted;
});

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance += action.payload;
            state.isLoading = false;
        },
        withdraw(state, action) {
            state.balance -= action.payload;
        },
        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: { amount, purpose },
                };
            },

            reducer(state, action) {
                if (state.loan > 0) return;

                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            },
        },
        payLoan(state) {
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deposit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deposit.fulfilled, (state, action) => {
                state.balance += action.payload;
                state.isLoading = false;
            })
            .addCase(deposit.rejected, (state) => {
                state.isLoading = false;
            });
    },
});
export const accountReducer = accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
