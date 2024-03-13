import React from 'react'
import { InitialProfile } from '@/lib/initial-profile';
import { db } from '@/lib/db';
import {redirect} from "next/navigation"
import { MyInitialModal } from "../../components/modals/MyInitialModal"

const SetupPage = async() => {

    const profile = await InitialProfile();

    const server = await db.server.findFirst({
        where :{
            members:{
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    if(server){
        return redirect(`/servers/${server.id}`)
    }

  return (
    <MyInitialModal/>
  )

}

export default SetupPage;





