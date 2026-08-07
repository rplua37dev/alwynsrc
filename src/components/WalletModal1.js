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
          <div className="mac-controls">
            <span className="mac-btn close" onClick={onClose}></span>
            <span className="mac-btn minimize"></span>
            <span className="mac-btn maximize"></span>
          </div>

          <div className="wallet-title-group">
            <div className="wallet-title">Coinbase</div>
          </div>

          <div style={{ width: "230px" }} />
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

