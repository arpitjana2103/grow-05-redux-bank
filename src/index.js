import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
// import { store } from "./redux-v1/store.v1";
import { store } from "./redux-v2-thunk/store.v2";
// import store from "./redux-v3-toolkit/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
    // </React.StrictMode>,
);
