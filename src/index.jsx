import ReactDOM from "react-dom/client";
import App from "./app";
import { StrictMode } from "react";
import "./index.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer />
    </ThemeProvider>
  </StrictMode>
);
