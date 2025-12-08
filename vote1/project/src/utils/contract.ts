import { ethers } from "ethers";
import VotingABI from "./VotingABI.json"; // Make sure this file contains your contract ABI

const CONTRACT_ADDRESS = "0xd6F4b9590679E273fDCf08492132AF14cc71153B"; // Replace with your deployed contract address

export function getVotingContract(signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, VotingABI.abi, signerOrProvider);
}