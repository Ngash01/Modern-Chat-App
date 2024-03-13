import { currentProfile } from "@/components/lib/current-profile"
import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import { DirectMessage, Message } from "@prisma/client";


export async function GET(req:Request){

    const MESSAGE_BATCH = 10;

    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(req.url)

        const cursor = searchParams.get("cursor")
        const conversationId = searchParams.get("conversationId")

        if(!profile){
            return new NextResponse("Unauthorized!", {status: 401})
        }

        if(!conversationId){
            return new NextResponse("Conversation ID is missing!", {status: 400})
        }

        let messages: DirectMessage[] = []

        if(cursor){
            messages = await db.directMessage.findMany({
                take: MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where:{
                    conversationId: conversationId
                },
                include:{
                    member:{
                        include:{
                            profile:true
                        }
                    }
                }
            })
        }else{
            messages = await db.directMessage.findMany({
                take: MESSAGE_BATCH,
                where:{
                    conversationId
                },
                include:{
                    member:{
                        include:{
                            profile:true
                        }
                    }
                },
                orderBy:{
                    createdAt: "desc"
                }
            })
        }
        let nextCursor = null;
        if(messages.length == MESSAGE_BATCH){
            nextCursor = messages[MESSAGE_BATCH -1 ].id
        }

        return NextResponse.json({
            items: messages,
            nextCursor
        })

    }catch(error){
        console.log("[DIRESCT_MESSAGES_GET]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}





