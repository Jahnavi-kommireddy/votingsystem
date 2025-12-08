import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";

module.exports = buildModule("Voting", (m) => {
  const votingContract = m.contract("Voting", ["Voting Contract"], {
    // gasPrice: ethers.parseUnits("50", "gwei"), // Set gas price directly in options
  });

  return { votingContract };
});