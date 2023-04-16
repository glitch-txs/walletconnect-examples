import { openWCModal } from "@/walletconnect/WCConnect"
import { WCInit } from "@/walletconnect/WCInit"
import WalletConnectProvider from "@walletconnect/legacy-provider"
import { ethers } from "ethers"
import { useEffect, useState } from "react"


export default function Home() {

  const [legacyProvider, setLegacyProvider] = useState<WalletConnectProvider | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')
  const [chainId, setChainId] = useState<number>(0)

  //Resolve issue when user closes modal and is unable to open again.
  const [reset, setReset] = useState<boolean>(false)


  const walletConnectInit = async()=>{
    setIsLoading(true)
    const provider = await WCInit()
    const accounts = provider.accounts
    const chainId = provider.chainId

    if(accounts.length > 0){
      setAddress(accounts[0])
      setChainId(chainId)
    }

    setLegacyProvider(provider)
    setIsLoading(false)
  }

  useEffect(()=>{
    walletConnectInit()
  },[reset])
  
  const handleConnect = async()=>{
    if(!legacyProvider) return

    setIsLoading(true)
    if(legacyProvider.accounts.length > 0){
      await legacyProvider.disconnect()

      //If reset is fast it will pick up the last connection and user will need to disconnect twice
      setTimeout(()=>setReset(p => !p),2000)
      setAddress('')
      setChainId(0)
      return
    }

    const userIsConnected = await openWCModal(legacyProvider)

    if(userIsConnected){
      const web3Provider = new ethers.providers.Web3Provider(legacyProvider)
      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      const chainId = await signer.getChainId()
      setAddress(address)
      setChainId(chainId)
    }else{
      setReset(p => !p)
    }

    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button 
      className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
      disabled={isLoading} 
      onClick={handleConnect} >
        { address ? 'Disconnect' : 'Connect'}
      </button>
      address: {address} {' '}
      chainId: {chainId}
    </main>
  )
}
