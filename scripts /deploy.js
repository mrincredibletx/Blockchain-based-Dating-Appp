// deploy.js
import { ethers } from "ethers";
import * as fs from "fs";

// Replace with your values
const RPC_URL = "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID";
const PRIVATE_KEY = "YOUR_PRIVATE_KEY";

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const abi = JSON.parse(fs.readFileSync("./artifacts/BlockchainDatingApp.json", "utf-8")).abi;
  const bytecode = JSON.parse(fs.readFileSync("./artifacts/BlockchainDatingApp.json", "utf-8")).bytecode;

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy();

  console.log("Contract deployed at:", contract.target);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
