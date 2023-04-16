import { useAccount } from "wagmi";
import { useState } from "react";
import useWeb3Provider from "@/hooks/useWeb3Provider";

export default function Balance() {

  const [userBalance, setUserBalance] = useState<string>()

    const { isConnected, address } = useAccount()

    const {provider} = useWeb3Provider()

    async function getBalance (){
        if(!address) return
        const _userBalance = await provider.eth.getBalance(address)
        setUserBalance(_userBalance)
    }

  return (
    <>
    <button 
    className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
    onClick={getBalance} 
    disabled={!isConnected}>
      Get Balance
    </button>
    {userBalance}
    </>
  );
}