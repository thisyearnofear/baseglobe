// src/components/FlipCardWrapper.tsx
import React from "react";
import Image from "next/legacy/image";
import FlipCard, { BackCard, FrontCard } from "./FlipCard";

interface FlipCardWrapperProps {
  isMinted: boolean;
  hash: string | undefined;
  assetId: number;
  contractAddress: string;
}

const FlipCardWrapper: React.FC<FlipCardWrapperProps> = ({
  isMinted,
  hash,
  assetId,
  contractAddress,
}) => {
  return (
    <div style={{ flex: "0 0 auto" }}>
      <FlipCard>
        <FrontCard isCardFlipped={isMinted}>
          <Image
            layout="responsive"
            src="/BaseGlobeDegen.png"
            width="500"
            height="500"
            alt="RainbowKit Demo NFT"
            priority
          />
          <h1 style={{ marginTop: 24 }}>Based Global Degen</h1>
        </FrontCard>
        <BackCard isCardFlipped={isMinted}>
          <div style={{ padding: 24 }}>
            <Image
              src="/BaseGlobeDegen.png"
              width="80"
              height="80"
              alt="RainbowKit Demo NFT"
              style={{ borderRadius: 8 }}
              priority
            />
            <h2 style={{ marginTop: 24, marginBottom: 6 }}>Minted!</h2>
            <p style={{ marginBottom: 24 }}>
              Your NFT will show up in your wallet in the next few minutes.
            </p>
            <p style={{ marginBottom: 6 }}>
              View on{" "}
              <a href={`https://sepolia.basescan.org/tx/${hash}`}>Basescan</a>
            </p>
            <p>
              View on{" "}
              <a
                href={`https://testnets.opensea.io/assets/base-sepolia/${contractAddress}/${assetId}`}
              >
                Opensea
              </a>
            </p>
          </div>
        </BackCard>
      </FlipCard>
    </div>
  );
};

export default FlipCardWrapper;
