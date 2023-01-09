import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./styles.css";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
