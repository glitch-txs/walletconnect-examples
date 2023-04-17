import { Web3Modal } from "@web3modal/standalone";
import { useEffect, useState } from "react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure web3Modal
const web3Modal = new Web3Modal({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  walletConnectVersion: 2,
});

export default function HomePage() {
  const [provider, setProvider] = useState<any>();
  const [userAddress, setUserAddress] = useState<string>();

  // 3. Initialize provider
  async function onInitializeProvider() {
    const _provider = await EthereumProvider.init({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
      chains: [1],
      showQrModal:true
    });
    setProvider(_provider);
  }

  // 4. Initiate connection and pass pairing uri to the modal
  async function onOpenModal() {
    if (provider) {
      const namespaces = {
        eip155: {
          methods: ["eth_sign"],
          chains: ["eip155:1"],
          events: ["accountsChanged"],
        },
      };
      try{
        const { uri, approval } = await provider.connect();
        if (uri) {
          await web3Modal.openModal({
            uri,
            standaloneChains: namespaces.eip155.chains,
          });
          await approval();
          web3Modal.closeModal();
        }
      }catch(er: any){
        console.error(er)
      }
    }
  }

  useEffect(() => {
    onInitializeProvider();
  }, []);

  async function getUserAddress() {
    if (provider) {
      const _accounts = await provider.request({ method: 'eth_accounts' })
      setUserAddress(_accounts[0])
    }
  }

  return provider ? (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-3">
    <button 
    className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
    onClick={onOpenModal}>Connect Wallet</button>
    <button 
    className='py-0.5 px-2 rounded-md hover:bg-gray-500 transition duration-75 border-2' 
    onClick={getUserAddress}>get address</button>
    { userAddress }
    </main>
  ) : (
    "Initializing..."
  );
}