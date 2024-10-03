// components/NFTCard.tsx
import React from "react";
import Image from "next/legacy/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import FlipCard, { BackCard, FrontCard } from "../FlipCard/FlipCard";

interface NFTCardProps {
  isMinted: boolean;
  hash: `0x${string}` | undefined;
  txData: { to: string } | undefined;
}

const NFTCard: React.FC<NFTCardProps> = ({ isMinted, hash, txData }) => (
  <FlipCard>
    <FrontCard isCardFlipped={isMinted}>
      <Image
        layout="responsive"
        src="/nft.png"
        width={500}
        height={500}
        alt="RainbowKit Demo NFT"
        priority
      />
      <h1 style={{ marginTop: 24 }}>Rainbow NFT</h1>
      <ConnectButton />
    </FrontCard>
    <BackCard isCardFlipped={isMinted}>
      <div style={{ padding: 24 }}>
        <Image
          src="/nft.png"
          width={80}
          height={80}
          alt="RainbowKit Demo NFT"
          style={{ borderRadius: 8 }}
          priority
        />
        <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
        <p style={{ marginBottom: 24 }}>
          Your NFT will show up in your wallet in the next few minutes.
        </p>
        <p style={{ marginBottom: 6 }}>
          View on{" "}
          <a href={`https://rinkeby.etherscan.io/tx/${hash}`}>Etherscan</a>
        </p>
        <p>
          View on{" "}
          <a
            href={`https://testnets.opensea.io/assets/rinkeby/${txData?.to}/1`}
          >
            Opensea
          </a>
        </p>
      </div>
    </BackCard>
  </FlipCard>
);

export default NFTCard;
