import { openWCModal } from "@/walletconnect/WCConnect"
import { WCInit } from "@/walletconnect/WCInit"
import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"


export default function Home() {

  const [universalProvider, setUniversalProvider] = useState<any>()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [address, setAddress] = useState<string>('')


  const walletConnectInit = async()=>{
    setIsLoading(true)
    const universalProvider = await WCInit()
    setUniversalProvider(universalProvider)
    setIsLoading(false)
  }

  useEffect(()=>{
    walletConnectInit()
  },[])

  const handleConnect = async()=>{
    if(!universalProvider) return

    if(universalProvider.session){
      await universalProvider.disconnect()
      setAddress('')
      return
    }

    const userIsConnected = await openWCModal(universalProvider)

    if(userIsConnected){
      const web3Provider = new ethers.providers.Web3Provider(universalProvider)
      const signer = web3Provider.getSigner()
      const address = await signer.getAddress()
      setAddress(address)
      setSigner(signer)
    }
  }

  const interact = useCallback(async()=>{

    const contractAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

    const ERC20Abi = [
      "function name() view returns (string)",
      "function approve(address spender, uint256 amount)"
    ];

    const erc20Contract = new ethers.Contract(contractAddress, ERC20Abi, signer)

    const name = await erc20Contract.approve(address, 1).catch((e: any)=> {
      if(e.code == 5000) console.log('user rejected transaction')
      console.error(e)
    })

    console.log(name)

  },[]) 

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button 
      className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
      disabled={isLoading} 
      onClick={handleConnect} >
        { address ? 'Disconnect' : 'Connect'}
      </button>
      {address}
      <br />
      <button 
      className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
      onClick={interact} >interact</button>
    </main>
  )
}
