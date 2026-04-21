// Inital State
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createdAt: "",
};

// Reducer
export function customerReducer(state = initialStateCustomer, action) {
    switch (action.type) {
        case "customer/createCustomer":
            return {
                ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt,
            };
        case "customer/updateName":
            return { ...state, fullName: action.payload };
        default:
            return state;
    }
}

// Action Creators
export function createCustomer(fullName, nationalID) {
    return {
        type: "customer/createCustomer",
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
    };
}

export function updateName(fullName) {
    return { type: "account/updateName", payload: fullName };
}
