export const triggerEvents = (universalProvider: any)=>{
    if(!universalProvider) return
    
    // Subscribe to session ping
    universalProvider.on("session_ping", ({ id, topic }: any) => {
        console.log("session_ping", id, topic);
    });
    
    // Subscribe to session event
    universalProvider.on("session_event", ({ event, chainId }: any) => {
        console.log("session_event", event, chainId);
    });
    
    // Subscribe to session update
    universalProvider.on("session_update", ({ topic, params }: any) => {
        console.log("session_update", topic, params);
    });
    
    // Subscribe to session delete
    universalProvider.on("session_delete", ({ id, topic }: any) => {
        console.log("session_delete", id, topic);
    });
}