export const triggerEvents = (provider: any)=>{
    if(!provider) return

    provider.off("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
    });

    provider.off("chainChanged", (chainId: number) => {
        console.log(chainId);
    });
    
    provider.off("disconnect", (code: number, reason: string) => {
        console.log(code, reason);
    });
        
    provider.on("accountsChanged", (accounts: string[]) => {
        console.log(accounts);
    });

    provider.on("chainChanged", (chainId: number) => {
        console.log(chainId);
    });
    
    provider.on("disconnect", (code: number, reason: string) => {
        //handle Disconnect
        console.log(code, reason);
    });
}