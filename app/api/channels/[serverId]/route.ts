import { currentProfile } from "@/components/lib/current-profile"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req:Request, {params}:{params: {serverId: string}}){
    try{
        const profile = await currentProfile();
        const { name } = await req.json()
        const serverId = params.serverId


        if(!profile){
            return new NextResponse("unauthorized", {status: 401})
        }

        if(!serverId){
            return new NextResponse("Server Id missing!")
        }

        const server = await db.server.update({
            where:{
                id: serverId,
                members:{
                    some:{
                        profileId: profile.id
                    }
                }
            },
            data:{
                channels:{
                    create:{
                        profileId: profile.id,
                        name
                    }
                }
            }
        })


        return NextResponse.json(server)
        

    }catch(err){
        console.log("CHANNELS_POST", err)
    }
}


