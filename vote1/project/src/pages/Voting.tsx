// Example: src/components/Voting.tsx
import React, { useState } from "react";
import { ethers } from "ethers";
import { getVotingContract } from "../utils/contract";

const VotingComponent: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setAccount(await signer.getAddress());
      // Now you can use getVotingContract(signer)
    } else {
      alert("Please install MetaMask!");
    }
  };

  const addCandidate = async (name: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = getVotingContract(signer);
    const tx = await contract.addCandidate(name);
    await tx.wait();
    alert("Candidate added!");
  };

  // Add similar functions for vote, getResults, resetVoting, endVoting

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {/* Add UI for addCandidate, vote, getResults, etc. */}
    </div>
  );
};

export default VotingComponent;