"use client";

import { useSocket } from "./socket-provider";
import { Badge } from "./ui/badge";


export const SocketIndicator = ()=>{
    const { isConnected } = useSocket()


if(!isConnected){
    return(
        <Badge variant={"outline"} className="bg-yellow-600 text-white border-none">
            Fallback: polling every 1s
        </Badge>
    )
}

return(
    <Badge variant={"outline"} className="bg-green-600 text-white border-none">
        Live: Real time updates
    </Badge>
)
}





