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
import qs from "query-string"


 export const DeleteMessageModal = () => {
    const {isOpen, onClose, type, data}  = useModal()
    const params = useParams()
    const {apiUrl, query, }  = data
    const [isLoading, setIsLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // console.log("server data attachments here ",data)


    const isModalOpen = isOpen && type === "deleteMessage"
    const router = useRouter()
    
    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, []);


    const submitValues = async()=>{
            try{
                setIsLoading(true)
                const url = qs.stringifyUrl({
                    url: apiUrl || "",
                    query
                })

                await axios.delete(url)
                console.log("message deleted")
                setIsLoading(false)
                toast.success("Message deleted successfully!")
                onClose()
                window.location.reload()
                window.scrollTo(0, document.body.scrollHeight);
            }catch(error){
                toast.error("Something went wrong!")
                console.log("client error - deleteMessage.jsx ", error)
                setIsLoading(false)
                onClose()
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
                <DialogTitle className="font-bold text-2xl text-center flex gap-x-3">Delete Message?</DialogTitle>
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



