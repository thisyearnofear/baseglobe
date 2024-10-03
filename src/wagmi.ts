import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";
import { abi } from "../contract-abi";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [baseSepolia],
  ssr: true,
});

// Update this with your contract's address
export const contractConfig = {
  address: "0x62D3f69218A7fd765c16FB0857F992d564Fbb30c", // New contract address
  abi,
} as const;
