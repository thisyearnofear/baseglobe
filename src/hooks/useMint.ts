import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { abi } from "../../contract-abi";

const contractConfig = {
  address: "0x62D3f69218A7fd765c16FB0857F992d564Fbb30c",
  abi,
} as const;

const assetId = 1;

export const useMint = () => {
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

  const mintToken = () =>
    mint?.({
      ...contractConfig,
      functionName: "mint",
      args: [assetId, 1],
    });

  return {
    mintToken,
    isMintLoading,
    isMintStarted,
    isMinted,
    mintError,
    txError,
    hash,
  };
};
