import '../styles/globals.css'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { injected, metaMask } from 'wagmi/connectors'

const config = createConfig({
  chains: [base],
  connectors: [injected(), metaMask()],
  transports: {
    [base.id]: http('https://mainnet.base.org'),
  },
})

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
