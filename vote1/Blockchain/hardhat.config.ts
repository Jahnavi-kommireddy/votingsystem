import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0xf40b09edcfb8dfc5f8125705009b21ae14afb6c660661d5006ff9392f7924046"
        // Replace with your actual Ganache private key
      ],
    },
  },
};

export default config;
