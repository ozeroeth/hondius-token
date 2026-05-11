require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const CONTRACT_ADDRESS =
  process.env.CONTRACT_ADDRESS ||
  "0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035";

const ABI = [
  "function mint(uint256 slotCount) external payable",
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function totalMinted() external view returns (uint256)",
  "function slotsUsed(address account) external view returns (uint256)",
  "function slotsRemaining(address account) external view returns (uint256)",
  "function publicMintRemaining() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
];

function getProvider() {
  const rpcUrl = process.env.BASE_RPC_URL || "https://mainnet.base.org";
  return new ethers.JsonRpcProvider(rpcUrl);
}

function getContract() {
  const provider = getProvider();
  return new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
}

function getRelayerWallet() {
  const provider = getProvider();
  return new ethers.Wallet(process.env.RELAYER_PRIVATE_KEY, provider);
}

// GET /api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// GET /api/status
app.get("/api/status", async (req, res) => {
  try {
    const contract = getContract();
    const totalMinted = await contract.totalMinted();
    const publicMintRemaining = await contract.publicMintRemaining();

    const tokensPerSlot = BigInt("690000000000000000000000000");
    const slotsClaimed = totalMinted / tokensPerSlot;
    const mintPricePerSlot = BigInt("1000000000000000");
    const ethCollected = ethers.formatEther(slotsClaimed * mintPricePerSlot);

    res.json({
      slotsClaimed: Number(slotsClaimed),
      totalSlots: 46000,
      ethCollected,
      totalMinted: ethers.formatUnits(totalMinted, 18),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/wallet/:address
app.get("/api/wallet/:address", async (req, res) => {
  try {
    const { address } = req.params;
    if (!ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }

    const contract = getContract();
    const [slotsUsed, slotsRemaining, balance] = await Promise.all([
      contract.slotsUsed(address),
      contract.slotsRemaining(address),
      contract.balanceOf(address),
    ]);

    res.json({
      address,
      slotsUsed: Number(slotsUsed),
      slotsRemaining: Number(slotsRemaining),
      balance: ethers.formatUnits(balance, 18),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rate limiter for /api/mint
const mintLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: "Too many mint requests, please try again later" },
});

// POST /api/mint
app.post("/api/mint", mintLimiter, async (req, res) => {
  try {
    const { address, slots } = req.body;

    if (!address || !ethers.isAddress(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }
    if (!slots || slots < 1 || slots > 10) {
      return res.status(400).json({ error: "Slots must be between 1 and 10" });
    }

    const wallet = getRelayerWallet();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const mintPrice = BigInt(slots) * ethers.parseEther("0.001");

    const tx = await contract.mint(slots, { value: mintPrice });
    await tx.wait();

    const tokensToTransfer = BigInt(slots) * BigInt("690000000000000000000000000");
    const transferTx = await contract.transfer(address, tokensToTransfer);
    await transferTx.wait();

    res.json({
      success: true,
      txHash: transferTx.hash,
      slots,
      address,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`HONDIUS relayer API running on port ${PORT}`);
});
