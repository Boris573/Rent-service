import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import MainRouter from './router/MainRouter';

import { createTheme } from "./theme";
import { store } from "./store";
import { AuthConsumer, AuthProvider } from "./contexts/JwtContext";
import { SettingsConsumer, SettingsProvider } from "./contexts/SettingsContext";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { SplashScreen } from "./components/Layout/SplashScreen";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <AuthProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => (
                <ThemeProvider
                  theme={createTheme({
                    responsiveFontSizes: settings.responsiveFontSizes,
                    mode: settings.theme
                  })}
                >
                  <Toaster position="top-center" />
                  <CssBaseline />
                  <AuthConsumer>
                    {
                      (auth) => !auth.isInitialized
                        ? <SplashScreen />
                        : <MainRouter />
                    }
                  </AuthConsumer>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
);
