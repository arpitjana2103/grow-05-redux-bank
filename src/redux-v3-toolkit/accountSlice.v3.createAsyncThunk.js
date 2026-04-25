import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ✅ renamed to avoid collision
export const depositAsync = createAsyncThunk("account/depositAsync", async function ({ amount, currency }) {
    if (currency === "USD") return amount;

    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);

    const data = await res.json();
    return data.rates.USD;
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

                const { amount, purpose } = action.payload;

                state.loan = amount;
                state.loanPurpose = purpose;
                state.balance += amount;
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
            .addCase(depositAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(depositAsync.fulfilled, (state, action) => {
                state.balance += action.payload;
                state.isLoading = false;
            })
            .addCase(depositAsync.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const accountReducer = accountSlice.reducer;

// ✅ export correct actions
export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;
