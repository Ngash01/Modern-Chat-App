"use client"

import { Member, Message, Profile } from "@prisma/client";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import { ChatItem } from "./chat-item";
import { format } from "date-fns";

interface ChatMessagesProps{
    name:string;
    member: string,
    chatId: string,
    apiUrl:string,
    socketUrl:string,
    socketQuery: Record<string, string>,
    paramKey: "channelId" | "conversationId",
    paramValue: string,
    type: "channel" | "conversation"
}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}


export const ChatMessages = ({name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type}: ChatMessagesProps)=>{

    const DATE_FORMAT = "d MMM yyy, HH:mm";

    const queryKey = `chat:${chatId}`
    const {data, fetchNextPage, isFetchingNextPage, status, hasNextPage} = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    })

    if(status === "pending" ){
        return(
            <div className="flex flex-col flex-1 justify-center items-center ">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
                <p className="text-zinc-500 dark:text-zinc-400">Loading messages...</p>
            </div>
        )
    }

    if(status === "error" ){
        return(
            <div className="flex flex-col flex-1 justify-center items-center ">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4"/>
                <p className="text-zinc-500 dark:text-zinc-400">Something went wrong...</p>
            </div>
        )
    }

    return(
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1 "/>
            <ChatWelcome type={type} name={name}/>
            <div className="flex flex-col-reverse mt-auto ">
                {data?.pages?.map((group, i)=>{
                    return(
                        <Fragment key={i}>
                            {group.items.map((message: MessageWithMemberWithProfile)=>{
                                return(
                                    <div key={message.id} className="mt-2 py-1">
                                        <ChatItem key={message.id} id={message.id} content={message.content}
                                        fileUrl={message.fileUrl} 
                                        deleted={message.deleted} 
                                        timeStamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                        isUpdated={message.updatedAt !== message.createdAt}
                                        socketUrl={socketUrl}
                                        socketQuery={socketQuery}
                                        member={message.member}
                                        currentMember={member}
                                        />
                                    </div>
                                )
                            })}
                        </Fragment>
                    )
                })}
            </div>
        </div>
    )
}





