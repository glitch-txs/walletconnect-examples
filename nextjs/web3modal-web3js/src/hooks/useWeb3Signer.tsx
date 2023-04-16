import { useSigner } from "wagmi";
import Web3 from 'web3';
const toWeb3Provider = require('ethers-to-web3');

export default function useWeb3Signer() {

 const signer = useSigner()

 const web3signer = toWeb3Provider(signer)

 const web3 = new Web3(web3signer)

  return { provider: web3 }
}