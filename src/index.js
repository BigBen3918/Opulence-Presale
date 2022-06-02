import { ColorModeScript } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./app";

import "react-circular-progressbar/dist/styles.css";
import "./assets/css/style.css";

ReactDOM.render(
    <StrictMode>
        <ColorModeScript />
        <App />
    </StrictMode>,
    document.getElementById("root")
);
