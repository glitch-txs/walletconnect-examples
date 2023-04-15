import { web3Modal } from "./WCInit";

export const openWCModal = async(universalProvider: any)=> {
  let approved = false

  await universalProvider?.connect({
    namespaces: {
      eip155: {
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
        ],
        chains: ["eip155:56", "eip155:137", "eip155:1"],
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {
          1:'https://eth.llamarpc.com',
          56: 'https://bsc-dataseed.binance.org/',
          137:'https://polygon-rpc.com',
        }
      },
    },
  }).then((e: any)=> approved = true).catch((e: any)=> console.error(e))

  web3Modal?.closeModal();

  return approved
}