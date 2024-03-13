"use client"

import { ServerWithMembersWithProfile } from "@/types"
import { ChannelType, MemberRole } from "@prisma/client"
import { ActionTooltip } from "../actionTooltip"
import { Plus } from "lucide-react"
import { useModal } from "@/hooks/use-modal-store"

interface ServerSectionProps{
    label:string,
    role?: MemberRole,
    sectionType: "channels" | "members",
    channelType: ChannelType,
}

export const ServerSection = ({label, sectionType, channelType}:ServerSectionProps)=>{

    const { onClose, onOpen } = useModal()

    return(
        <div className="flex items-center justify-between py-2 ">
            <p className="text-sm uppercase font-semibold text-zinc-500 dark:text-zinc-200 ">{label}</p>
            {sectionType === "channels" && (
                <ActionTooltip label="create channel" side="top">
                    <button className="text-zinc-400 hover:text-zinc-500" onClick={()=>onOpen("createChannel")}>
                        <Plus className="h-5 w-5 "/>
                    </button>
                </ActionTooltip>
                
            )}
        </div>
    )
}





