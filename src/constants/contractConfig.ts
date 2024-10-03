import { Address, Abi } from "viem";
import { abi } from "../../contract-abi";

export const contractConfig = {
  address: "0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30" as Address,
  abi: abi as Abi,
} as const;
