import { NextResponse } from "next/server";
import { currentProfile } from "../../../components/lib/current-profile";
import { db } from "../../../lib/db";
import { v4 as uuidv4 } from "uuid"
import { MemberRole } from "@prisma/client";


export async function POST(req){
    try{
        const {name, imageUrl} = await req.json();
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized!", {status: 401})
        }


        const server = await db.server.create({
            data:{
                profileId: profile.id,
                name: name,
                imageUrl:imageUrl,
                inviteCode: uuidv4(),
                channels:{
                    create:[
                        {name: "general", profileId: profile.id}
                    ]
                },
                members:{
                    create:[
                        {profileId: profile.id, role:MemberRole.ADMIN}
                    ]
                }
            }
        })

        return NextResponse.json(server)

    }catch(error){
        console.log("[SERVERS POST]", error)
        return new NextResponse("Internal Error", {status: 500})
    }
}



