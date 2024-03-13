"use client"

import { cn } from "@/lib/utils"
import { Channel, Member } from "@prisma/client"
import { Server } from "http"
import { Edit, Hash, Lock, Mic, Trash2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ActionTooltip } from "../actionTooltip"
import { ServerWithMembersWithProfile } from "@/types"
import { useModal } from "@/hooks/use-modal-store"

interface ServerChannelProps{
    channel: Channel,
    server: ServerWithMembersWithProfile,
    role?: Member
    label: string
}


export const ServerChannel = ({channel, server, role, label}:ServerChannelProps)=>{
    const params = useParams()
    const { onOpen } = useModal();
    const router = useRouter()

    const click = ()=>{
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }

 
  return(
    <button onClick={click} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition mb-1", 
    params?.channelId === channel.id && label == "textChannels" && "bg-zinc-700/20 dark:bg-zinc-700")}>
        {label == "textChannels" ? <Hash className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"/> : <Mic className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"  />}
        <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-300 dark:text-zinc-400 transition", 
        params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>{channel.name}</p>
        {channel.name !== "general" && (
            <div className="ml-auto flex flex-center items-center gap-x-2">
                <ActionTooltip label="Edit">
                    <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                </ActionTooltip>
                <ActionTooltip label="delete">
                    <Trash2 onClick={()=>onOpen("deleteChannel", {server})} className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"/>
                </ActionTooltip>
            </div>
        )}
        {channel.name == "general" && (
            <Lock className="h-4 w-4 ml-auto text-zinc-500"/>
        )}
    </button>
  )
}




