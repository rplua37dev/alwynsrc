import React from "react";
import fox from "../assets/fox.svg";
import spinner from "../assets/spinner.gif";

export default function LandingPage({ onNext }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-30px",
        }}
      >
       

        <img
          src={spinner}
          alt="spinner"
          style={{
            width: "52px",
            height: "52px",
            marginTop: "16px",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}






