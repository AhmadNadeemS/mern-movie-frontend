import React from "react";
import AuthProvider from "./AuthProvider";
import MoviesProvider from "./MoviesProvider";
import NotificationProvider from "./NotificationProvider";
import SearchProvider from "./SearchProvider";
import ThemeProvider from "./ThemeProvider";

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <SearchProvider>
        <AuthProvider>
          <MoviesProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </MoviesProvider>
        </AuthProvider>
      </SearchProvider>
    </NotificationProvider>
  );
}
