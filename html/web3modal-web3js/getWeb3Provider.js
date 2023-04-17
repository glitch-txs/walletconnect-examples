import { fetchSigner } from '@wagmi/core'
import Web3 from 'web3';
import toWeb3Provider from 'ethers-to-web3'
import { getAccount } from '@wagmi/core'

function useWeb3Signer() {

 const signer = fetchSigner()

 const web3signer = toWeb3Provider(signer)

 const web3 = new Web3(web3signer)

  return { provider: web3 }
}

export async function getBalance() {
  console.log("trigger")
    const { provider } = useWeb3Signer()
    console.log("trigger2", provider)
    const account = getAccount()
    console.log("trigger3", account)
    const userBalance = await provider.eth.getBalance(account.address)
    console.log("trigger4", userBalance)
    
    const el = document.getElementById('balance')
    el.innerText = "Balance: " + userBalance
}