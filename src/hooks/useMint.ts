// hooks/useMint.ts
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractConfig } from "../constants/contractConfig";

export const useMint = (onMintSuccess: () => void) => {
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

  const handleMint = async () => {
    try {
      const result = await mint?.({
        ...contractConfig,
        functionName: "mint",
      });
      console.log("Mint transaction sent:", result);
    } catch (error) {
      console.error("Minting error:", error);
    }
  };

  // Call the onMintSuccess callback when the transaction is successful
  if (txSuccess) {
    onMintSuccess();
  }

  return {
    hash,
    txData,
    isMintLoading,
    isMintStarted,
    mintError: mintError as Error | undefined,
    txSuccess,
    txError: txError as Error | undefined,
    handleMint,
  };
};
