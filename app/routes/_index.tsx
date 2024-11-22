import type { MetaFunction } from '@remix-run/node'
import { ABI, ADDRESS } from 'cs01-2024'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPublicClient, getContract, http } from 'viem'
import { holesky } from 'viem/chains'
import configs from '~/configs'

export const meta: MetaFunction = () => {
  return [
    { title: 'Web3 Counter' },
    {
      name: 'description',
      content:
        'Bài 5. Giao diện DApp | CS01: Dự án chuẩn công nghiệp trên Ethereum | 2024',
    },
  ]
}

export default function Index() {
  const [counter, setCounter] = useState('0')

  const contract = useMemo(() => {
    const publicClient = createPublicClient({
      chain: holesky,
      transport: http(configs.rpc),
    })
    return getContract({
      address: ADDRESS,
      abi: ABI,
      client: { public: publicClient },
    })
  }, [])

  const fetchCounter = useCallback(async () => {
    const counter = await contract.read.counter()
    return setCounter(counter.toString())
  }, [contract])

  useEffect(() => {
    fetchCounter()
  }, [fetchCounter])

  return (
    <div className="w-full min-h-dvh flex flex-col gap-4 items-center justify-center">
      <p>
        <span className="opacity-60">Counter: </span>
        <span className="font-black">{counter}</span>
      </p>
      <button className="btn btn-primary">Increase</button>
    </div>
  )
}
