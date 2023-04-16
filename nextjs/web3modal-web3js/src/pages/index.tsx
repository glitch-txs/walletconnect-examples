import Balance from "@/components/balance";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import dynamic from "next/dynamic";

// Read: https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142
const ConnectButton = dynamic(() => import("@/components/customButton"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ConnectButton/>
      <br/>
      <Web3Button avatar="show" icon="show" label="Connect Wallet" balance="show" />
      <br/>
      <Web3NetworkSwitch />
      <br/>
      <Balance/>
    </main>
  )
}
