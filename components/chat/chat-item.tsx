"use client"

import { Member, MemberRole, Profile } from "@prisma/client"
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { ActionTooltip } from "../actionTooltip";
import { Edit, File, FileType, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter, useParams } from "next/navigation"

interface ChatItemProps{
    id:string,
    content:string,
    member: Member & {
        profile: Profile;
    },
    timeStamp: string,
    fileUrl: string | null,
    deleted: boolean,
    currentMember: Member,
    isUpdated: boolean,
    socketUrl: string,
    socketQuery: Record<string, string>
}

const roleIconMap = {
    "GUEST" : null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"/>,
    "ADMIN" : <ShieldAlert className="h-4 w-4 ml-2 text-rose-500"/>
}

export const ChatItem = ({id, content, member, timeStamp, fileUrl, deleted, currentMember, isUpdated, socketUrl, socketQuery}: ChatItemProps)=>{
    const FileType = fileUrl?.split(".").pop()
    let initials = member.profile.name.split(' ').map(part => part.charAt(0)).join('');
    const { onOpen } = useModal();
    const router = useRouter()
    const params = useParams()

    const onMemberClick  = ()=>{
        if(member.id === currentMember.id){
            return;
        }

        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }
    
    const isAdmin = currentMember.role === MemberRole.ADMIN
    const isModerator = currentMember.role === MemberRole.MODERATOR
    const isOwner = currentMember.id === member.id
    const canDeleteMessage = !deleted && isOwner
    const canEditMessage = !deleted && isOwner;
    const isPDF = FileType === "pdf" && fileUrl;
    const isImage = !isPDF && fileUrl

    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false)

    const formSchema = z.object({
        content: z.string().min(1)
    })
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    })

    useEffect(()=>{
        form.reset({
            content:content
        })
    },[content])

    return(
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full py-2">
            <div className="group flex gap-x-2 items-start w-full py-2">
                <div className="cursor-pointer hover:drop-shadow-md transition ">
                    <Avatar onClick={onMemberClick}>
                        <AvatarImage src={member.profile.imageUrl}></AvatarImage>
                        <AvatarFallback>
                            {initials}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-start gap-x-2 ">
                        <div className="flex items-center gap-x-3">
                            <p onClick={onMemberClick} className=" text-sm hover:underline cursor-pointer text-blue-200">
                                {member.profile.name}
                            </p>
                            <ActionTooltip label={member.role} >
                                {roleIconMap[member.role]}
                            </ActionTooltip>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                {timeStamp}
                            </div>
                        </div>
                    </div>
                    {[".png", ".jpg", ".jpeg"].some(ext => content.endsWith(ext)) ? (
                            <a href={content} target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-md mt-2 overflow-hidden
                            border flex items-center bg-secondary h-48 w-48">
                                <Image src={content} alt="content" fill className="object-cover"/>
                            </a>
                        ): <p className={cn(" text-xl text-zinc-600 dark:text-zinc-100 font-semibold", 
                        deleted && "italic text-zinc-500 dark:text-zinc-400 mt-1 text-base")}>
                            {content}
                            {isUpdated && !deleted && (
                                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                                    (edited)
                                </span>
                            )}
                        </p>} 
                </div>
            </div>
            {canDeleteMessage && (
                <div className=" flex items-center gap-x-2 absolute p-1 top-[-1] right-5 bg-white dark:bg-zinc-800 border rounded-sm">
                    {canEditMessage && (
                        <ActionTooltip label="edit">
                            <Edit onClick={()=>setIsEditing(true)} className="cursor-pointer ml-auto w-5 h-5 text-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300"/>
                        </ActionTooltip>
                    )}
                    <ActionTooltip label="delete">
                            <Trash2 onClick={()=>onOpen("deleteMessage",{apiUrl: `${socketUrl}/${id}`, query:socketQuery})} className="cursor-pointer ml-auto w-5 h-5 text-zinc-500 hover:text-zinc-500 dark:hover:text-zinc-300"/>
                        </ActionTooltip>
                </div>
            )}
        </div>
    )
}





