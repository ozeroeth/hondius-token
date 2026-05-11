/**
 * Reference deploy script for HondiusToken.
 * This contract is deployed on Base mainnet at:
 * 0x40Ee80C0888505F70497DeAcE456c5999B57837f
 *
 * DO NOT run this script. It exists for documentation purposes only.
 */

const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const HondiusToken = await ethers.getContractFactory("HondiusToken");
  const token = await HondiusToken.deploy();
  await token.waitForDeployment();

  console.log("HondiusToken deployed to:", await token.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
