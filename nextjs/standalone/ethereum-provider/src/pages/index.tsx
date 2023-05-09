import { useEffect, useState } from "react";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

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

  // 4. Connect
  async function onOpenModal() {
    if (provider) {
      try{
        await provider.connect();
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