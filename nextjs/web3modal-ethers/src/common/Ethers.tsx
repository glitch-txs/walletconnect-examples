import React from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'
import { ethers } from "ethers";
type Props = {}

//MAINNET CONTRACT !!
const address = "0x33132493DBfA4072D4655fe3f8238cbB940FaC4a";

const abi = [
  "function name() view returns (string)",
]

const buttonClass = 'py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2 cursor-pointer'

const Ethers = (props: Props) => {

  const publicClient = usePublicClient()
  const walletClient = useWalletClient()

  const callProvider = async()=>{
    const provider = new ethers.providers.Web3Provider(publicClient as ethers.providers.ExternalProvider)
    const contract = new ethers.Contract(address, abi, provider);
    const res = await contract.name()
    console.log("res", res)
  }

  const callContract = async()=>{
    if(walletClient.data){
      const provider = new ethers.providers.Web3Provider(walletClient.data as ethers.providers.ExternalProvider)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(address, abi, signer);
      const res = await contract.name()
      console.log("res", res)
    }
  }
  return (
    <>
    <div 
    className={buttonClass}
    onClick={callContract} >Call Contract with Signer</div>
    <br/>
    <div
    className={buttonClass}
    onClick={callProvider} >Call Contract with Provider</div>
    </>

  )
}

export default Ethers