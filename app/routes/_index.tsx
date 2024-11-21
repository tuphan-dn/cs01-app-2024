import type { MetaFunction } from '@remix-run/node'

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
  return (
    <div className="w-full min-h-dvh flex flex-col gap-4 items-center justify-center">
      <p>
        <span className="opacity-60">Counter: </span>
        <span className="font-black">0</span>
      </p>
      <button className="btn btn-primary">Increase</button>
    </div>
  )
}
