import React, { useState, useEffect } from "react";
import "../styles/modal.css";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import useDrag from "../hooks/useDrag";

export default function WalletModal({ onClose }) {
  const [page, setPage] = useState("landing");

  const {
    dragRef,
    position,
    handleMouseDown,
  } = useDrag();

  return (
    <div className="wallet-overlay">
      <div
        ref={dragRef}
        className="wallet-modal"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`wallet-header ${"dark"}`}
          onMouseDown={handleMouseDown}
        >
          <div className="wallet-title-group">
            <img src="/fox_icon.png" alt="icon" className="wallet-icon"  />
            <div className="wallet-title-text" style={{ fontSize: "12px",  fontFamily: "Arial, sans-serif" }}>
              Coinbase Wallet
            </div>
          </div>

          <div className="wallet-controls">
            <button
              className="win-btn"
              onMouseDown={(e) => e.stopPropagation()}
            >
              —
            </button>

            <button
              className="win-btn"
              onMouseDown={(e) => e.stopPropagation()}
            >
              ☐
            </button>

            <button
              className="win-btn close-btn"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="wallet-body">
          {page === "landing" ? (
            <LandingPage onNext={() => setPage("login")} />
          ) : (
            <LoginPage onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

