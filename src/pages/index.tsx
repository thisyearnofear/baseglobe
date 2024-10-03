import React from "react";
import type { NextPage } from "next";
import ConnectWallet from "../../components/ConnectWallet/ConnectWallet";
import MintButton from "../../components/MintButton/MintButton";
import FlipCardWrapper from "../../components/FlipCard/FlipCardWrapper";
import ErrorMessages from "../../components/ErrorMessages/ErrorMessages";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { abi } from "../../contract-abi";
import styles from "../styles/home.module.css";

const contractConfig = {
  address: "0x62D3f69218A7fd765c16FB0857F992d564Fbb30c",
  abi,
} as const;

const assetId = 1;

const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { isConnected } = useAccount();

  const {
    data: hash,
    writeContract: mint,
    isPending: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useWriteContract();

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  const isMinted = txSuccess;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <div className={styles.contentContainer}>
            <ConnectWallet />
            <br />
            <FlipCardWrapper
              isMinted={isMinted}
              hash={hash}
              assetId={assetId}
              contractAddress={contractConfig.address}
            />
            <ErrorMessages mintError={mintError} txError={txError} />
            {mounted && isConnected && !isMinted && (
              <MintButton
                mint={() =>
                  mint?.({
                    ...contractConfig,
                    functionName: "mint",
                    args: [assetId, 1],
                  })
                }
                isMintLoading={isMintLoading}
                isMintStarted={isMintStarted}
                disabled={!mint || isMintLoading || isMintStarted}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
