import React from "react";
import ConnectWallet from "./ConnectWallet";
import ErrorMessages from "../ErrorMessages/ErrorMessages";

interface WalletStatusProps {
  isConnected: boolean;
  mintError: Error | undefined | null; // Allow null
  txError: Error | undefined | null; // Allow null
}

const WalletStatus: React.FC<WalletStatusProps> = ({
  isConnected,
  mintError,
  txError,
}) => {
  return (
    <>
      <ConnectWallet />
      <ErrorMessages mintError={mintError} txError={txError} />
    </>
  );
};

export default WalletStatus;
