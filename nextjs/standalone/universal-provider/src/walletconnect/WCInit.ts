import { UniversalProvider } from "@walletconnect/universal-provider";
import { Web3Modal } from "@web3modal/standalone";
import { checkChainAndAccount } from "./helper/checkChainAndAccount";
import { triggerEvents } from "./helper/eventListeners";

export const web3Modal = new Web3Modal({ 
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  walletConnectVersion:2,
  standaloneChains:["eip155:56", "eip155:137", "eip155:1"]
})
  
web3Modal.setTheme({
  themeMode: "light",
});

export const WCInit = async()=> {
  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
  }

  const universalProvider = await UniversalProvider.init({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    metadata: {
      name: "",
      description: "",
      url: "",
      icons: [""],
    },
  }).catch((e: any)=> {console.error("WC Init error: ", e)});

  universalProvider?.on("display_uri", async (uri: any) => {
    web3Modal?.openModal({ uri });
  });
  
  triggerEvents(universalProvider)
  
  //Check if user is already connected
  if(universalProvider?.session){
    checkChainAndAccount(universalProvider)
  }

  return universalProvider
}