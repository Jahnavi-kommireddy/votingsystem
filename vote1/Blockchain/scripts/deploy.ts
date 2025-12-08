// scripts/deploy.ts
import { ethers } from "hardhat";
import "@nomicfoundation/hardhat-ethers";

async function main() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy("Voting Contract");

    await voting.waitForDeployment();

    const address = await voting.getAddress();
    console.log("Voting contract deployed to:", address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

