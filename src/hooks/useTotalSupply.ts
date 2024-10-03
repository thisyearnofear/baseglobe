// hooks/useTotalSupply.ts
import { useReadContract } from "wagmi";
import { contractConfig } from "../constants/contractConfig";

export const useTotalSupply = (): bigint => {
  const { data: totalSupplyData } = useReadContract({
    ...contractConfig,
    functionName: "totalSupply",
  });

  return totalSupplyData != null ? BigInt(totalSupplyData.toString()) : 0n;
};
