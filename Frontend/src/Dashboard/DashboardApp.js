import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import Layout from "./containers/Layout";
import Login from "./features/user/Login";

const DashboardApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Boolean(localStorage.getItem("token")));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Provider store={store}>
      {isAuthenticated ? (
        <Layout onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </Provider>
  );
};

export default DashboardApp;