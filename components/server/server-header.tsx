"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useModal } from "@/hooks/use-modal-store"
  

import { ServerWithMembersWithProfile } from "@/types"
import { ChevronDown, PlusCircle, Settings, Trash, Trash2, UserPlus, Users } from "lucide-react"

interface serverHeaderProps{
    server: ServerWithMembersWithProfile
}


export const ServerHeader = ({server}:serverHeaderProps)=>{

    const { onOpen } = useModal()

    // const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : ""
    // console.log("The origin is " + origin)

    return (
        <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button className="w-full text-md font-semibold px-3 flex items-center h-12  
            border-neutral-200 dark:border-neutral-800 border-b-2 hover-bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                <p className="text-semibold ">{server.name}</p>
                <ChevronDown className="ml-auto"/>
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 text-sm font-medium text-black dark:text-neutral-400 space-y-2px">
            <DropdownMenuLabel className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer flex" 
            onClick={()=>onOpen("invite", {server: server})}>
                <p>Invite People</p>
                <UserPlus className="h-4 w-4 ml-auto"/>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className=" px-3 py-2 text-sm cursor-pointer flex" onClick={()=>onOpen("editServer", {server})}>
                <p>Server settings</p>
                <Settings className="h-4 w-4 ml-auto"/>
            </DropdownMenuLabel>
            <DropdownMenuLabel className="px-3 py-2 text-sm cursor-pointer flex">
                <p>Manage  members</p>
                <Users className="h-4 w-4 ml-auto"/>
            </DropdownMenuLabel>
            <DropdownMenuLabel className="px-3 py-2 text-sm cursor-pointer flex" onClick={()=>onOpen("createChannel")}>
                <p>Create channel</p>
                <PlusCircle className="h-4 w-4 ml-auto"/>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-3 py-2 text-sm cursor-pointer flex" onClick={()=>onOpen("deleteServer", {server})}>
                <p className="text-red-500">Delete Server</p>
                <Trash2 className="h-4 w-4 ml-auto  text-red-500"/>
            </DropdownMenuLabel>
        </DropdownMenuContent>
</DropdownMenu>
    )
}



