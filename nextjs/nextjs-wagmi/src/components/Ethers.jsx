import React from 'react'
import { useNetwork, usePublicClient, useWalletClient } from 'wagmi'
import { ethers } from "ethers"

//MAINNET CONTRACT !!
const address = "0x33132493DBfA4072D4655fe3f8238cbB940FaC4a";

const abi = [
  "function name() view returns (string)",
]

const buttonClass = 'py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2 cursor-pointer'

const Ethers = () => {

  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const { chain } = useNetwork()

  //FOR READ CALLS ONLY
  const callProvider = async()=>{
    const provider = new ethers.providers.Web3Provider(publicClient)
    const contract = new ethers.Contract(address, abi, provider);
    const res = await contract.name()
    console.log("res", res)
  }

  
  //SIGNER
  const callContract = async()=>{
    if(!walletClient){
      throw Error ("User must be connected")
    }
    if(chain.id != 1){
      throw Error("Switch to mainnet")
    }
    /**In typescript:  const provider = new ethers.providers.Web3Provider(walletClient as ethers.providers.ExternalProvider) */
    const provider = new ethers.providers.Web3Provider(walletClient)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, abi, signer);
    const res = await contract.name()
    console.log(await signer.getAddress())
    console.log("res", res)
  }

  return (
    <>
      <button 
      className={buttonClass}
      onClick={callContract} >Call Contract with Signer
      </button>
      <br/>
      <button
      className={buttonClass}
      onClick={callProvider} >Call Contract with Provider
      </button>
    </>
  )
}

export default Ethers