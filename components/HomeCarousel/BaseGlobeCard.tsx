import React from "react";
import WalletStatus from "../ConnectWallet/WalletStatus";
import FlipCardWrapper from "../FlipCard/FlipCardWrapper";
import MintSection from "../MintSection/MintSection";
import styles from "./BaseGlobeCard.module.css";
import { useMint } from "../../src/hooks/useMint";

interface BaseGlobeCardProps {
  isConnected: boolean;
  mintProps: ReturnType<typeof useMint>;
}

export const BaseGlobeCard: React.FC<BaseGlobeCardProps> = ({
  isConnected,
  mintProps,
}) => {
  const {
    mintToken,
    isMintLoading,
    isMintStarted,
    isMinted,
    mintError,
    txError,
    hash,
  } = mintProps;

  return (
    <div className={styles.cardContent}>
      <WalletStatus
        isConnected={isConnected}
        mintError={mintError}
        txError={txError}
      />
      <FlipCardWrapper
        isMinted={isMinted}
        hash={hash}
        assetId={1}
        contractAddress="0x62D3f69218A7fd765c16FB0857F992d564Fbb30c"
      />
      <MintSection
        mintToken={mintToken}
        isMintLoading={isMintLoading}
        isMintStarted={isMintStarted}
        isMinted={isMinted}
        isConnected={isConnected}
      />
    </div>
  );
};
