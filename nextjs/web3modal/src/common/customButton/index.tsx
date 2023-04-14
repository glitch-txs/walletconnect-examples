import { useWeb3Modal } from "@web3modal/react";
import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import 'tailwindcss/tailwind.css'

const ConnectButton = () => {

    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const label = isConnected ? "Disconnect" : "Connect Wallet";
  
    async function onOpen() {
      setLoading(true);
      await open();
      setLoading(false);
    }
  
    function onClick() {
      if (isConnected) {
        disconnect();
      } else {
        onOpen();
      }
    }

  return (
    <button 
    className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
    onClick={onClick}
    disabled={loading}>
      {loading ? "Loading..." : label}
    </button>
  )
}

export default ConnectButton