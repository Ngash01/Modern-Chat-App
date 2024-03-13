"use client"
import { useEffect, useState } from "react";
import { CreateServerModal } from "../modals/createServerModal";
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/editServerModal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { DeleteServer } from "../modals/deleteServer";
import { DeleteChannel } from "../modals/delete-channel";
import { MessageFileModal } from "../modals/message-file-modal";
import { DeleteMessageModal } from "../modals/delete-message modal";

export const ModalProvider = ()=>{

    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null;
    }

    return(
        <div>
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <CreateChannelModal/>
            <DeleteServer/>
            <DeleteChannel/>
            <MessageFileModal/>
            <DeleteMessageModal/>
        </div>
    )
}

