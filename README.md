# HONDIUS - Mint via ChatGPT on Base

HONDIUS is a memecoin on Base that you mint by talking to ChatGPT. The relayer API handles gas, you just chat.

## Contract Info

- **Address:** `0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035`
- **Network:** Base (Chain ID 8453)
- **Basescan:** [View on Basescan](https://basescan.org/address/0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035)

> **NOTE:** Contract is already deployed. Do NOT redeploy.

## Architecture

| Component | Description |
|-----------|-------------|
| Smart Contract (Base) | ERC-20 with slot-based minting |
| Relayer API (Express) | Pays gas, broadcasts mint txs |
| ChatGPT GPT | User interface via conversation |
| Landing Page (Next.js) | Info site with wallet connection |

## Project Structure

```
hondius-token/
├── contracts/
│   └── HondiusToken.sol        # ERC-20 token (reference)
├── scripts/
│   └── deploy.js               # Deploy script (reference)
├── server/
│   ├── index.js                # Relayer API
│   └── openapi.json            # OpenAPI spec for ChatGPT
├── web/
│   ├── pages/
│   │   ├── _app.js             # App wrapper + wagmi
│   │   └── index.js            # Landing page
│   ├── styles/
│   │   └── globals.css         # Styles + IBM Plex Mono
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── gpt-instructions.txt        # ChatGPT GPT prompt
├── package.json                # Server deps
├── hardhat.config.js
├── .env.example
├── .gitignore
└── README.md
```

## Setup

```bash
# Install server dependencies
npm install

# Install frontend dependencies
cd web && npm install
```

## Running

```bash
# Start relayer API
cp .env.example .env
# Fill in your env vars
npm start

# Build frontend
cd web
npm run build

# Dev mode
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `CONTRACT_ADDRESS` | Deployed token address |
| `BASE_RPC_URL` | Base RPC endpoint |
| `RELAYER_WALLET` | Relayer wallet address |
| `RELAYER_PRIVATE_KEY` | Relayer wallet private key (for signing mint txs) |
| `BASESCAN_API_KEY` | For contract verification |
| `PORT` | API port (default 3000) |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/status` | Mint progress |
| GET | `/api/wallet/:address` | Wallet info |
| POST | `/api/mint` | Execute mint |

## Deploying Frontend

Push `web/` to Vercel. Set `NEXT_PUBLIC_API_URL` env var.

## Important

The contract is already deployed on Base mainnet. Do not redeploy.
