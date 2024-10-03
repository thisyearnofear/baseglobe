// components/MintInfo.tsx
import React from "react";
import styles from "./MintInfo.module.css";

interface MintInfoProps {
  totalMinted: bigint;
  mintError?: Error;
  txError?: Error;
}

const MintInfo: React.FC<MintInfoProps> = ({
  totalMinted,
  mintError,
  txError,
}) => {
  return (
    <div className={styles.mintInfo}>
      <p>{Number(totalMinted)} minted so far!</p>
      {mintError && <p style={{ color: "red" }}>Error: {mintError.message}</p>}
      {txError && (
        <p style={{ color: "red" }}>Transaction Error: {txError.message}</p>
      )}
    </div>
  );
};

export default MintInfo;
