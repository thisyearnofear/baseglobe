import React from "react";
import MintButton from "./MintButton/MintButton";

interface MintSectionProps {
  mintToken: () => void;
  isMintLoading: boolean;
  isMintStarted: boolean;
  isMinted: boolean;
  isConnected: boolean;
}

const MintSection: React.FC<MintSectionProps> = ({
  mintToken,
  isMintLoading,
  isMintStarted,
  isMinted,
  isConnected,
}) => {
  if (!isConnected || isMinted) return null;

  return (
    <MintButton
      mint={mintToken}
      isMintLoading={isMintLoading}
      isMintStarted={isMintStarted}
      disabled={isMintLoading || isMintStarted}
    />
  );
};

export default MintSection;
