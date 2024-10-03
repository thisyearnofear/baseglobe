import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./ConnectWallet.module.css";

const ConnectWallet: React.FC = () => {
  return (
    <div className={styles.connectWallet}>
      <ConnectButton />
    </div>
  );
};

export default ConnectWallet;
