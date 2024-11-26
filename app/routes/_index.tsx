import type { MetaFunction } from '@remix-run/node'
import clsx from 'clsx'
import { ABI, ADDRESS } from 'cs01-2024'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getContract } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

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
  const [counter, setCounter] = useState('...')
  const publicClient = usePublicClient()
  const { data: walletClient, error } = useWalletClient()

  const contract = useMemo(() => {
    if (!publicClient || !walletClient) return undefined
    return getContract({
      address: ADDRESS,
      abi: ABI,
      client: { public: publicClient, wallet: walletClient },
    })
  }, [publicClient, walletClient])

  const fetchCounter = useCallback(async () => {
    const counter = await contract?.read.counter()
    return setCounter(counter?.toString() || '...')
  }, [contract])

  const watchCounter = useCallback(() => {
    return contract?.watchEvent.Increase(
      {},
      {
        onLogs: ([
          {
            args: { counter },
          },
        ]) => {
          return setCounter(counter?.toString() || '...')
        },
      },
    )
  }, [contract])

  const increaseCounter = useCallback(async () => {
    if (!contract) return ''
    const txId = await contract.write.increase()
    return txId
  }, [contract])

  useEffect(() => {
    fetchCounter()
  }, [fetchCounter])

  useEffect(() => {
    return watchCounter()
  }, [watchCounter])

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <p>
        <span className="opacity-60">Counter: </span>
        <span className="font-black">{counter}</span>
      </p>
      <button
        className={clsx('btn btn-primary', {
          'btn-disabled': !contract,
          'btn-error': !!error,
        })}
        onClick={increaseCounter}
      >
        Increase
      </button>
    </div>
  )
}
