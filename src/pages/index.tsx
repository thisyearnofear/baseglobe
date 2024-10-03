import React from "react";
import type { NextPage } from "next";
import WalletStatus from "../../components/ConnectWallet/WalletStatus";
import FlipCardWrapper from "../../components/FlipCard/FlipCardWrapper";
import MintSection from "../../components/MintSection/MintSection";
import { useAccount } from "wagmi";
import { useMint } from "../hooks/useMint";
import styles from "../styles/home.module.css";

const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { isConnected } = useAccount();
  const {
    mintToken,
    isMintLoading,
    isMintStarted,
    isMinted,
    mintError,
    txError,
    hash,
  } = useMint();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.contentContainer}>
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
            {mounted && (
              <MintSection
                mintToken={mintToken}
                isMintLoading={isMintLoading}
                isMintStarted={isMintStarted}
                isMinted={isMinted}
                isConnected={isConnected}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
