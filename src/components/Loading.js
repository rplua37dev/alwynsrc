import React from "react";
import spinner from "../assets/loading.svg"; // Import your spinner SVG

export default function Loading({ isVisible }) {
  if (!isVisible) return null; // Don't render if loading is not visible

  return (
    <div className="loading-overlay">
      <div className="blurred-ui">
        <img src={spinner} alt="Loading" className="spinner" />
      </div>
    </div>
  );
}