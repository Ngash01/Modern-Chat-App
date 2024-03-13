import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SocketIndicator } from "../socket-indicator";

interface ChatHeaderProps{
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string
}

export const ChatHeader = ({serverId, name, type, imageUrl}: ChatHeaderProps)=>{

    return(
        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-700 border-b-2">
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"/>
            )}
            {/* {type === "channel" && (
                 <Avatar>
                 <AvatarImage  src={imageUrl} />
                 <AvatarFallback>{initials}</AvatarFallback>
             </Avatar>
            )} */}
            <p className="font-semibold text-md text-black dark:text-white">{name}</p>
            <div className="ml-auto flex items-center">
                <SocketIndicator/>
            </div>
        </div>
    )
}








