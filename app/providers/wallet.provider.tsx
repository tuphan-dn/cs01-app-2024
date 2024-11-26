import { type ReactNode } from 'react'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { http, WagmiProvider } from 'wagmi'
import { mainnet, holesky } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import configs from '~/configs'

import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Onchain Counter',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, holesky],
  transports: {
    [mainnet.id]: http(configs.mainnet),
    [holesky.id]: http(configs.holesky),
  },
  ssr: true,
})
const queryClient = new QueryClient()

export default function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
