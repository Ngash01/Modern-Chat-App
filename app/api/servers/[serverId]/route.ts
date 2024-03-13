import { currentProfile } from "@/components/lib/current-profile"
import { db } from "@/lib/db"
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"

export async function PATCH(req: Request, {params}:{params: {serverId: string}}){
    try{
        const profile = await currentProfile();

        if(!profile){
            return redirect("/sign-in")
        }

        const { name } = await req.json();

        const server = await db.server.update({
            where:{
                id: params.serverId
            },
            data:{
                name
            }
        })

        return NextResponse.json(server)
    
    }catch(Error){
        console.log("An error occured when renaming server: ", Error)
        return new  NextResponse("Something went wrong!", {status: 500})

    }
}


export async function DELETE(req:Request,{params}:{params:{serverId: string}}) {
    try{
        const profile = await currentProfile();

        if(!profile){
            return redirect("/sign-in")
        }


        const deleteServer = await db.server.delete({
            where:{
                id: params.serverId,
                profileId:profile.id
            }
        })
            
      

        // if(server){
        //     return redirect(`/servers/${server.id}`)
        // }

        return NextResponse.json(deleteServer)

    }catch(err){
        console.log("An error occcured when deleting server: ", err)
        return new NextResponse("Something went wrong!", {status: 500})
    }
    
}




