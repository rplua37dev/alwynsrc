import React, { useEffect, useState } from "react";
import ButtonPage from "./components/ButtonPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const path = window.location.pathname;
  const [showLogin, setShowLogin] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    document.title = "Login";
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = "/vercel-icon.png";
    }
  }, []);
  
  useEffect(() => {
    if (path === "/wallet") {
      const timer = setTimeout(() => {
        setShowLogin(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [path]);

  const handleClose = () => {
    localStorage.setItem("wallet_done", "true");
    setClosed(true);
    window.close();

    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  if (path === "/wallet") {
    if (closed) return null;

    return showLogin ? (
      <LoginPage onClose={handleClose} />
    ) : (
      <LandingPage />
    );
  }

  return <ButtonPage />;
}

export default App;