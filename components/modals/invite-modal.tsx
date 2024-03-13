"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


 export const InviteModal = () => {
    const {isOpen, onClose, type, data, onOpen}  = useModal()

    const isModalOpen = isOpen && type === "invite"
    const origin = useOrigin()
    const {server} = data

    const handleClose = ()=>{
        onClose()
    }

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const onCopy = ()=>{
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)

        setTimeout(()=>{
            setCopied(false)
        }, 1000)
    }


    const onNew = async()=>{
        try{
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            console.log("response ", response)

            onOpen("invite", {server: response.data})

            toast.success("Link regenerated!")

            setIsLoading(false)

        }catch(error){
            console.log(error)
            toast.error("Something went wrong!")
            setIsLoading(false)
        }
    } 


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black overflow-auto">
            <DialogHeader className={"pt-5 px-6 text-center"}>
                <DialogTitle className="font-bold text-2xl text-center">Invite Modal</DialogTitle>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-purple-900  italic">
                        Server Invite Link
                    </Label>
                    <p className="text-sm">To invite friends to your channel, copy and share this link with them</p>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black font-semibold focus-visible:ring-offset-0" value={inviteUrl}/>
                        <Button size={"icon"} onClick={onCopy} disabled={isLoading}>
                        {copied ? <Check className="w-4 h-4 ml-2"/> : <Copy className="w-4 h-4"/>}
                        </Button>
                    </div>
                    <Button variant="link" size={"sm"} className="text-sm text-zinc-800 mt-3 underline" onClick={onNew}>
                        Generate a new Link
                         <RefreshCcw className="w-4 h-4 ml-2"/>
                    </Button>
                </div>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    
  )
}




