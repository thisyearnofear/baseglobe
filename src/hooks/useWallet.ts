import { useAccount } from "wagmi";

export const useWallet = () => {
  const { isConnected } = useAccount();
  return { isConnected };
};
