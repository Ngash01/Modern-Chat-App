"use client"

import { cn } from "@/lib/utils"
import { Member, Profile } from "@prisma/client"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ServerWithMembersWithProfile } from "@/types"


interface ServerMemberProps{
    member:  Member & {profile: Profile}
    server: ServerWithMembersWithProfile
}

export const ServerMember = ({member, server}:ServerMemberProps)=>{

    const params = useParams();
    const router = useRouter();
    let initials = member.profile.name.split(' ').map(part => part.charAt(0)).join('');

    const handleClick = ()=>{
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }

    return(
        <button onClick={handleClick} className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700")}>
            <Avatar>
                <AvatarImage  src={member.profile.imageUrl}/>
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <p className={cn(params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white")}>{member.profile.name}</p>
        </button>
    )
}



