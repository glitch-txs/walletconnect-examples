export const openWCModal = async(walletConnectProvider: any)=> {
  let approved = false

  try{
    await walletConnectProvider?.enable()
    approved = true
  }catch(error: any){
    console.error(error)
  }

  return approved
}