import { openWCModal } from "@/walletconnect/WCConnect"
import { WCInit } from "@/walletconnect/WCInit"
import { useEffect, useState } from "react"


export default function Home() {

  const [universalProvider, setUniversalProvider] = useState<any>()
  const [provider, setProvider] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const walletInit = async()=>{
    setIsLoading(true)
    const universalProvider = await WCInit()
    setUniversalProvider(universalProvider)
    setIsLoading(false)
  }

  useEffect(()=>{
    walletInit()
  },[])

  const connect = async()=>{
    if(!universalProvider) return
    setIsLoading(true)
    const userIsConnected = await openWCModal(universalProvider)
    if(userIsConnected) setProvider(universalProvider)
    setIsLoading(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={connect} >Connect</button>
    </main>
  )
}
