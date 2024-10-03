// src/components/MintButton/MintButton.tsx
import React from "react";
import styles from "./MintButton.module.css";

interface MintButtonProps {
  mint: () => void;
  isMintLoading: boolean;
  isMintStarted: boolean;
  disabled: boolean;
}

const MintButton: React.FC<MintButtonProps> = ({
  mint,
  isMintLoading,
  isMintStarted,
  disabled,
}) => {
  return (
    <button
      className={styles.mintButton} // Use the CSS module for styling
      disabled={disabled}
      onClick={mint}
    >
      {isMintLoading && "Waiting for approval"}
      {isMintStarted && "Minting..."}
      {!isMintLoading && !isMintStarted && "Mint"}
    </button>
  );
};

export default MintButton;
