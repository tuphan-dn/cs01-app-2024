export const env = process.env.NODE_ENV

const configs: Record<typeof env, { mainnet: string; holesky: string }> = {
  development: {
    holesky: 'https://holesky.infura.io/v3/783c24a3a364474a8dbed638263dc410',
    mainnet: 'https://mainnet.infura.io/v3/783c24a3a364474a8dbed638263dc410',
  },
  test: {
    holesky: '',
    mainnet: '',
  },
  production: {
    holesky: 'https://holesky.infura.io/v3/783c24a3a364474a8dbed638263dc410',
    mainnet: 'https://mainnet.infura.io/v3/783c24a3a364474a8dbed638263dc410',
  },
}

export default configs[env]
