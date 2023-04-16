import WalletConnectProvider from "@walletconnect/legacy-provider";
import { triggerEvents } from "./helper/eventListeners";

export const WCInit = async()=> {
  const walletConnectProvider = new WalletConnectProvider({
    rpc:{
      1:'https://eth.llamarpc.com',
      56: 'https://bsc-dataseed.binance.org/',
      137:'https://polygon-rpc.com',
    },
    // infuraId:''
  })

  triggerEvents(walletConnectProvider)

  return walletConnectProvider
}