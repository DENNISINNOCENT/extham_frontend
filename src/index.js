// import React from "react";
// import { render } from "react-dom";
// import "./index.css";
// import App from "./App";

// const root = document.getElementById("root");
// render(<App />, root);
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { OmsProvider } from "./components/auth/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <OmsProvider>
      <App />
    </OmsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


