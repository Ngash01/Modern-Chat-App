"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog"
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import { useEffect, useState } from "react";




 export const DeleteChannel = () => {
    const {isOpen, onClose, type, data}  = useModal()
    const params = useParams()
    const {server}  = data
    const [isLoading, setIsLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // console.log("server data attachments here ",data)


    const isModalOpen = isOpen && type === "deleteChannel"
    const router = useRouter()
    
    useEffect(()=>{
        setIsMounted(true)
    },[])



    const submitValues = async()=>{
            try{
                setIsLoading(true)
                // const res = await axios.delete(`/api/servers/${server?.id}/channels/${}`)

                console.log("channel deleted")
                // setIsLoading(false)
                // toast.success("Server deleted successfully!")
                // onClose()
                // window.location.reload()
            }catch(error){
                toast.error("Something went wrong!")
                console.log("client error - deleteServer.jsx ", error)
                setIsLoading(false)
            }
        }
    

    const handleClose = ()=>{
        onClose()
    }

    if(!isMounted){
        return null;
    }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black overflow-auto">
            <DialogHeader className={"pt-5 px-6 text-center"}>
                <DialogTitle className="font-bold text-2xl text-center flex gap-x-3">Delete Channel?</DialogTitle>
                <DialogDescription className=" text-zinc-900 text-md">
                This Action is irreversible. Are you sure you want to proceed with deletion?
                </DialogDescription>
                
            </DialogHeader>
                    <DialogFooter>
                    <div className="flex justify-end gap-x-3 items-center">
                        <Button className="border-black border-2" onClick={handleClose}>Cancel</Button>
                        <Button className="" variant="destructive" disabled={isLoading}  onClick={submitValues}>Continue</Button>
                        </div>
                    </DialogFooter>
        </DialogContent>
    </Dialog>
    
  )}



