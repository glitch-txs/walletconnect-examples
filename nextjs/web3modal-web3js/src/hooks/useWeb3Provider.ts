import { useProvider } from "wagmi";
import Web3 from 'web3';
const toWeb3Provider = require('ethers-to-web3');

export function useWeb3Provider() {

 const provider = useProvider()

 const web3provider = toWeb3Provider(provider)

 const web3 = new Web3(web3provider)

  return { provider: web3 }
}