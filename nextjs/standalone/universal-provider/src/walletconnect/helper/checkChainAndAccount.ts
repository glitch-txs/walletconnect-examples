import { ethers } from "ethers"

export const checkChainAndAccount = async (provider: any)=>{

    const web3Provider = new ethers.providers.Web3Provider(provider)

    const signer = web3Provider.getSigner()

    const address = await signer.getAddress()

    console.log('WC: user account ',address)

    // Handle address

    const chainId = await signer.getChainId()

    // Handle chainId

    console.log(`WC: chain id - ${chainId}`)
}