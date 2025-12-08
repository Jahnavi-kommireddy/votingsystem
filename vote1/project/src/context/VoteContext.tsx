import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ethers } from "ethers";
import { getVotingContract } from "../utils/contract";

// Types for the context
type VoteContextType = {
  account: string | null;
  connectWallet: () => Promise<void>;
  addCandidate: (name: string) => Promise<void>;
  castVote: (candidateId: number) => Promise<void>;
  getResults: () => Promise<any>;
};

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const useVote = () => {
  const context = useContext(VoteContext);
  if (!context) throw new Error("useVote must be used within a VoteProvider");
  return context;
};

type VoteProviderProps = {
  children: ReactNode;
};

export const VoteProvider: React.FC<VoteProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  // Auto-connect if already authorized
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) setAccount(accounts[0]);
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setAccount(await signer.getAddress());
  };

  const addCandidate = async (name: string) => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getVotingContract(signer);
    const tx = await contract.addCandidate(name);
    await tx.wait();
  };

  const castVote = async (candidateId: number) => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getVotingContract(signer);
    const tx = await contract.vote(candidateId);
    await tx.wait();
  };

  const getResults = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = getVotingContract(provider);
    // getResults returns [candidates[], winnerId]
    const [candidates, winnerId] = await contract.getResults();
    // Convert BigNumber fields to numbers for easier use in UI
    const parsedCandidates = candidates.map((c: any) => ({
      id: c.id.toNumber(),
      name: c.name,
      voteCount: c.voteCount.toNumber(),
    }));
    return { candidates: parsedCandidates, winnerId: winnerId.toNumber() };
  };

  return (
    <VoteContext.Provider
      value={{
        account,
        connectWallet,
        addCandidate,
        castVote,
        getResults,
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};