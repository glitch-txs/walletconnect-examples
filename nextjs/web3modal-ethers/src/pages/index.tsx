import Ethers from "@/common/Ethers";
import ConnectButton from "@/common/customButton";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <ConnectButton/>
      <br/>
      <Web3Button avatar="show" icon="hide" label="Connect me" balance='hide' />
      <br/>
      <Web3NetworkSwitch />
      <br/>
      <Ethers/>
    </main>
  )
}
