import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Providers/AuthProvider.tsx";
import { Toaster } from "react-hot-toast";
import { AbilityProvider } from "./Providers/AbilityProvider.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ABFF",
      contrastText: "#ffffff",
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 500,
      retry: 3,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AbilityProvider>
            <ThemeProvider theme={theme}>
              <App />
              <Toaster />
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </AbilityProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
