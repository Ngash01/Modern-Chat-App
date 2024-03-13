import { currentProfile } from '@/components/lib/current-profile'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

interface serverIdprops{
  params: {
    serverId: String
  }
}

const ServerIdPage = async({params}:serverIdprops) => {

  const profile = await currentProfile();

  if(!profile){
    return redirect('/sign-in')
  }

  const server = await db.server.findUnique({
    where:{
      id:params.serverId,
      members:{
        some:{
          profileId:profile.id
        }
      }
    },
    include:{
      channels:{
        where:{
          name:"general"
        },
        orderBy:{
          createdAt: "asc"
        }
      }
    }
  })

  const initialChannel = server?.channels[0];

  if(initialChannel?.name !== "general"){
    return null;
  }

  return (
    redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
  )
}

export default ServerIdPage;





