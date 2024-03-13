import { redirect } from "next/navigation";
import { currentProfile } from "../lib/current-profile"
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { ServerSection } from "./serverSection";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface serverProps{
    serverId: string
}

export const ServerSideBar = async({serverId}:serverProps)=>{

    const profile = await currentProfile();

    if(!profile){
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where:{
            id: serverId,
        },
            include:{
                channels:{
                    orderBy:{
                        createdAt: "desc"
                    }
                },
                members:{
                    include:{
                        profile: true
                },
                orderBy: {
                    role: "asc"
                }
            },
        }
        })


        const textChannels = server?.channels.filter((channel)=> channel.type === ChannelType.TEXT) 
        const audioChannels = server?.channels.filter((channel)=> channel.type === ChannelType.AUDIO) 
        const videoChannels = server?.channels.filter((channel)=> channel.type === ChannelType.VIDEO) 

        const members = server?.members.filter((member) => member.profileId !== profile.id)
    
        if(!server){
            return redirect("/")
        }

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F4]">
            <ServerHeader server={server}/>
            <ScrollArea className="flex-1 px-3">
                <div className="relative flex items-center">
                    <Search className="absolute text-gray-500 h-5 w-5 bottom-2 pl-1"/>
                    <Input className="bg-[#2a2b2e] mt-2 pl-7 w-fit" placeholder="Search channels"/>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                {!!textChannels?.length && (
                    <div className="mb-2 ">
                        <ServerSection sectionType={"channels"} channelType={ChannelType.TEXT} label={"Text Channels"}/>
                    </div>
                )}
                {textChannels?.map((channel)=>{
                    return(
                        <ServerChannel key={channel.id} channel={channel} server={server} label={"textChannels"}/>
                    )
                })}

                <Separator className="mt-3 mb-3 border-2 border-black"/>
                
                {!!textChannels?.length && (
                    <div className="mb-2 ">
                        <ServerSection sectionType={"channels"} channelType={ChannelType.AUDIO} label={"Audio Channels"} />
                    </div>
                )}
                {textChannels?.map((channel)=>{
                    return(
                        <ServerChannel key={channel.id} channel={channel} server={server} label={"audioChannels"}/>
                    )
                })}

                    {/* Members */}
                {!!members?.length && (
                    <div className="mb-2 ">
                        <ServerSection sectionType={"members"} label={"members"} channelType={ChannelType.TEXT}/>
                    </div>
                )}
                {members?.map((member)=>{
                    return(
                        <ServerMember key={member.id} member={member} server={server} />
                    )
                })}
               
            </ScrollArea>
        </div>
    )
}














