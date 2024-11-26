import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from '@remix-run/react'

export default function Header() {
  return (
    <div className="w-full sticky t-0 bg-base-100 p-4 flex flex-row gap-4 items-center">
      <Link className="bg-primary w-10 h-10 rounded-full shadow" to="/" />
      <div className="grow" />
      <ConnectButton />
    </div>
  )
}
