import React, { useState } from "react";
import type { NextPage } from "next";
import WalletStatus from "../../components/ConnectWallet/WalletStatus";
import FlipCardWrapper from "../../components/FlipCard/FlipCardWrapper";
import MintSection from "../../components/MintSection/MintSection";
import AircraftSelection from "../../components/AircraftSelection/AircraftSelection";
import { useAccount } from "wagmi";
import { useMint } from "../hooks/useMint";
import styles from "../styles/home.module.css";
import { Card, CardContent } from "../../components/UI/card";
import PilotSelection from "../../components/PilotSelection/PilotSelection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/UI/carousel";

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false);
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

  const cards = [
    {
      title: "Base Globe",
      content: (
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
      ),
    },
    {
      title: "Select Avatar",
      content: <PilotSelection />,
    },
    {
      title: "Select Pilot",
      content: <AircraftSelection />,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Carousel className={styles.carousel}>
          <CarouselContent className={styles.carouselContent}>
            {cards.map((card, index) => (
              <CarouselItem key={index} className={styles.carouselItem}>
                <Card className={styles.card}>
                  <CardContent>
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    {card.content}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className={styles.carouselControls}>
            <CarouselPrevious className={styles.carouselButton} />
            <CarouselNext className={styles.carouselButton} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
