export const env = process.env.NODE_ENV

const configs: Record<typeof env, { rpc: string }> = {
  development: {
    rpc: 'https://holesky.infura.io/v3/783c24a3a364474a8dbed638263dc410',
  },
  test: {
    rpc: '',
  },
  production: {
    rpc: 'https://mainnet.infura.io/v3/783c24a3a364474a8dbed638263dc410',
  },
}

export default configs[env]
