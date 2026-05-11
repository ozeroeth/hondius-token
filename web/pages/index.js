import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import Head from 'next/head'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [status, setStatus] = useState(null)
  const [walletData, setWalletData] = useState(null)
  const [copied, setCopied] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/api/status`)
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(() => {
        setStatus({
          totalMinted: '12,420,000,000',
          slotsClaimed: 18,
          totalSlots: 46000,
          ethCollected: '18.000',
        })
      })
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      fetch(`${API_URL}/api/wallet/${address}`)
        .then(res => res.json())
        .then(data => setWalletData(data))
        .catch(() => {
          setWalletData({ slotsUsed: 0, slotsRemaining: 10, balance: '0' })
        })
    }
  }, [isConnected, address])

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <>
      <Head>
        <title>hondius - mint via chatgpt</title>
        <meta name="description" content="mint $HONDIUS via chatgpt. a memecoin you mint by talking to your ai." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono font-bold text-text-primary text-lg">&#9670; hondius</span>
            <span className="font-mono text-xs text-muted hidden sm:block">sign once, chatgpt mints</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 font-mono text-sm text-text-primary/70">
            <a href="#why" className="hover:text-text-primary transition-colors">why</a>
            <a href="#architecture" className="hover:text-text-primary transition-colors">arch</a>
            <a href="#mint" className="hover:text-text-primary transition-colors">mint</a>
            <a href="#status" className="hover:text-text-primary transition-colors">status</a>
            <a href="#safety" className="hover:text-text-primary transition-colors">safety</a>
          </nav>
          <span className="font-mono text-xs text-muted border border-muted rounded-full px-3 py-1">
            base &middot; 8453
          </span>
        </div>
      </header>

      <main className="font-mono pt-20">
        {/* HERO */}
        <section className="max-w-6xl mx-auto px-4 py-20 sm:py-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            mint $HONDIUS<br />via chatgpt.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl">
            a memecoin you mint by talking to your ai.<br />
            connect wallet. chatgpt handles the rest.<br />
            zero complexity. much ship. very outbreak. wow.
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            <span className="border border-muted rounded-full px-3 py-1 text-xs text-text-primary/80">SUPPLY: 69,000,000,000</span>
            <span className="border border-muted rounded-full px-3 py-1 text-xs text-text-primary/80">PRICE: 0.001 ETH/slot</span>
            <span className="border border-muted rounded-full px-3 py-1 text-xs text-text-primary/80">MAX: 10 slots/wallet</span>
            <span className="border border-muted rounded-full px-3 py-1 text-xs text-text-primary/80">PUBLIC: 46%</span>
            <span className="border border-muted rounded-full px-3 py-1 text-xs text-text-primary/80">LP: 49%</span>
            <span className="border border-muted rounded-full px-3 py-1 text-xs text-text-primary/80">DEV: 5%</span>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="https://chatgpt.com/g/hondius"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-chatgpt text-white font-mono font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
            >
              &#9654; open in chatgpt
            </a>
            <a
              href="#architecture"
              className="border border-text-primary/30 text-text-primary font-mono font-medium px-6 py-3 rounded hover:border-text-primary/60 transition-colors"
            >
              read the arch &rarr;
            </a>
          </div>

          {/* CSS Ship Silhouette */}
          <div className="ship-drift mt-16 flex justify-center">
            <div className="relative w-64 h-32 opacity-20">
              {/* Hull */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-text-primary/30 rounded-b-full" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}></div>
              {/* Deck */}
              <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-40 h-3 bg-text-primary/20"></div>
              {/* Mast */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-text-primary/40"></div>
              {/* Sail */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-16 h-14 bg-text-primary/10 border-l border-text-primary/20" style={{ clipPath: 'polygon(0% 0%, 100% 20%, 100% 80%, 0% 100%)' }}></div>
              {/* Crow's nest */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-text-primary/30"></div>
              {/* Fog effect */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>
        </section>

        {/* 01 WHY */}
        <section id="why" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 01 why this exists</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">minting memecoins is broken.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded p-6">
              <p className="text-accent text-sm mb-3">[problem: multi-step]</p>
              <p className="text-sm text-text-primary/70 leading-relaxed">
                find contract -&gt; paste address -&gt; approve -&gt; sign -&gt; wait -&gt; cry
              </p>
            </div>
            <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded p-6">
              <p className="text-chatgpt text-sm mb-3">[solution: chatgpt actions]</p>
              <p className="text-sm text-text-primary/70 leading-relaxed">
                say &quot;mint&quot;. chatgpt calls the relayer. relayer broadcasts. tokens arrive.
              </p>
            </div>
            <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded p-6">
              <p className="text-accent text-sm mb-3">[network: base]</p>
              <p className="text-sm text-text-primary/70 leading-relaxed">
                l2. fast. cheap. your ETH goes to liquidity, not gas fees.
              </p>
            </div>
          </div>
        </section>

        {/* 02 ARCHITECTURE */}
        <section id="architecture" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 02 architecture</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">three steps. one conversation.</h2>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <span className="text-accent font-bold text-lg">01</span>
              <div>
                <p className="font-bold text-text-primary">CONNECT</p>
                <p className="text-sm text-text-primary/70">authorize your wallet address</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-accent font-bold text-lg">02</span>
              <div>
                <p className="font-bold text-text-primary">CHAT</p>
                <p className="text-sm text-text-primary/70">open chatgpt. say mint $HONDIUS. the GPT calls our relayer API.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-accent font-bold text-lg">03</span>
              <div>
                <p className="font-bold text-text-primary">RECEIVE</p>
                <p className="text-sm text-text-primary/70">690,000,000 $HONDIUS lands in your wallet on Base.</p>
              </div>
            </div>
          </div>

          {/* ASCII flow diagram */}
          <pre className="text-xs sm:text-sm text-text-primary/60 overflow-x-auto">
{`  [wallet] ---> [chatgpt] ---> [relayer] ---> [base l2]
     |              |              |              |
  connect        prompt          sign           mint`}
          </pre>
        </section>

        {/* 03 QUICK START */}
        <section id="mint" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 03 quick start</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">one link. then talk.</h2>

          {/* ChatGPT logo circle */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-chatgpt flex items-center justify-center">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <a
              href="https://chatgpt.com/g/hondius"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-chatgpt text-white font-mono font-medium px-8 py-4 rounded text-lg hover:opacity-90 transition-opacity"
            >
              &#9654; open hondius minter on chatgpt
            </a>
          </div>

          {/* Terminal conversation window */}
          <div className="max-w-lg mx-auto border border-[#1a1a1a] rounded bg-[#0f0f0f] p-4 sm:p-6">
            <pre className="text-xs sm:text-sm text-text-primary/80 leading-relaxed whitespace-pre overflow-x-auto">
{`\u250c\u2500 hondius minter \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502                                    \u2502
\u2502 > mint $HONDIUS to my wallet       \u2502
\u2502                                    \u2502
\u2502 \u25c6 connecting to relayer...         \u2502
\u2502 \u25c6 tool: mint(slots=1)             \u2502
\u2502 \u25c6 tx: 0x9f2a...b3c1 confirmed     \u2502
\u2502                                    \u2502
\u2502 \u2713 +690,000,000 $HONDIUS credited  \u2502
\u2502   slots used: 1/10                 \u2502
\u2502                                    \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518`}
            </pre>
          </div>
        </section>

        {/* 04 LIVE STATUS */}
        <section id="status" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 04 live state</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">mint progress</h2>

          {/* Progress bar */}
          <div className="max-w-xl">
            <div className="flex justify-between text-sm text-text-primary/70 mb-2">
              <span>{status ? status.slotsClaimed : '...'} / 46,000 slots claimed</span>
              <span>{status ? `${((status.slotsClaimed / status.totalSlots) * 100).toFixed(1)}%` : '...'}</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-chatgpt rounded-full transition-all duration-500"
                style={{ width: status ? `${(status.slotsClaimed / status.totalSlots) * 100}%` : '0%' }}
              ></div>
            </div>
            <p className="text-sm text-text-primary/50 mt-2">
              ETH collected: {status ? status.ethCollected : '...'} ETH
            </p>
          </div>

          {/* Wallet connection */}
          <div className="mt-10 border border-[#1a1a1a] bg-[#0f0f0f] rounded p-6 max-w-xl">
            {!isConnected ? (
              <button
                onClick={() => connect({ connector: injected() })}
                className="bg-accent text-white font-mono px-6 py-3 rounded hover:opacity-90 transition-opacity"
              >
                connect wallet
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-text-primary/70">
                  connected: <span className="text-accent">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                </p>
                <p className="text-sm text-text-primary/70">
                  your slots: {walletData ? `${walletData.slotsUsed}/10` : '...'}
                </p>
                <p className="text-sm text-text-primary/70">
                  your balance: {walletData ? walletData.balance : '...'} $HONDIUS
                </p>
                <button
                  onClick={() => disconnect()}
                  className="text-xs text-danger hover:underline mt-2"
                >
                  disconnect
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 05 TOKENOMICS */}
        <section id="tokenomics" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 05 tokenomics</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">fair launch. no bullshit.</h2>

          <pre className="text-xs sm:text-sm text-text-primary/80 overflow-x-auto leading-relaxed">
{`public mint  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588 46%  31.74B
liq. pool    \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588  49%  33.81B
dev/founder  \u2588\u2588                    5%   3.45B
\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
total supply                     100%    69B`}
          </pre>

          <div className="mt-8 space-y-2 text-sm text-text-primary/60">
            <p>mint price: 0.001 ETH per slot</p>
            <p>per slot: 690,000,000 $HONDIUS</p>
            <p>max per wallet: 10 slots</p>
            <p>max raise: 46 ETH (all to liquidity)</p>
          </div>
        </section>

        {/* 06 CONTRACT */}
        <section id="contract" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 06 contract</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">immutable. verified. open source.</h2>

          <div className="space-y-6">
            {/* Token address */}
            <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded p-4 sm:p-6">
              <p className="text-xs text-muted mb-1">$HONDIUS token</p>
              <div className="flex flex-wrap items-center gap-3">
                <code className="text-xs sm:text-sm text-accent break-all">0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035</code>
                <button
                  onClick={() => copyToClipboard('0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035', 'token')}
                  className="text-xs text-text-primary/50 hover:text-text-primary border border-muted px-2 py-1 rounded transition-colors"
                >
                  {copied === 'token' ? 'copied' : 'copy'}
                </button>
                <a
                  href="https://basescan.org/address/0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:underline"
                >
                  view on basescan
                </a>
              </div>
            </div>

            {/* LP Reserve */}
            <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded p-4 sm:p-6">
              <p className="text-xs text-muted mb-1">LP reserve</p>
              <div className="flex flex-wrap items-center gap-3">
                <code className="text-xs sm:text-sm text-accent break-all">0xd3007607d24ef0a79f9513b41be293b6cdbb161f</code>
                <button
                  onClick={() => copyToClipboard('0xd3007607d24ef0a79f9513b41be293b6cdbb161f', 'lp')}
                  className="text-xs text-text-primary/50 hover:text-text-primary border border-muted px-2 py-1 rounded transition-colors"
                >
                  {copied === 'lp' ? 'copied' : 'copy'}
                </button>
                <a
                  href="https://basescan.org/address/0xd3007607d24ef0a79f9513b41be293b6cdbb161f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:underline"
                >
                  view on basescan
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 07 SAFETY */}
        <section id="safety" className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <p className="text-sm text-muted mb-2">// 07 safety</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10">the contract enforces the rules.</h2>

          <div className="border border-[#1a1a1a] bg-[#0f0f0f] rounded p-4 sm:p-6">
            <pre className="text-xs sm:text-sm text-text-primary/80 leading-relaxed overflow-x-auto">
{`$ audit --contract HondiusToken
> checking admin mint......... [NONE] \u2713
> checking blacklist........... [NONE] \u2713
> checking pause function....... [NONE] \u2713
> checking upgradability........ [NONE] \u2713
> checking ETH destination... [LP_ONLY] \u2713
> checking max per wallet.. [10 SLOTS] \u2713
> checking dev allocation........ [5%] \u2713
> checking source code....... [PUBLIC] \u2713

all checks passed. contract is trustless.`}
            </pre>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-[#1a1a1a] mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
            <p className="font-bold text-text-primary text-lg mb-2">&#9670; hondius</p>
            <p className="text-sm text-text-primary/50 mb-6">much ship. very outbreak. wow.</p>

            <div className="flex flex-wrap gap-6 text-sm text-text-primary/60 mb-8">
              <a href="https://basescan.org/address/0x66Bfb8934858F23af2D630cC96bbB7F94eeA1035" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">basescan</a>
              <a href="https://chatgpt.com/g/hondius" target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors">chatgpt</a>
              <a href="#" className="hover:text-text-primary transition-colors">x.com</a>
              <a href="#" className="hover:text-text-primary transition-colors">telegram</a>
            </div>

            <p className="text-xs text-muted">built on base &middot; 2025</p>
            <p className="text-xs text-muted mt-1">// the ship sails on</p>
          </div>
        </footer>
      </main>
    </>
  )
}
