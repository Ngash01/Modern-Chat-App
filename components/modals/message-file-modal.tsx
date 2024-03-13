"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import qs from "query-string"


 export const MessageFileModal = () => {

    const [imageUploadUrl, setImageUploadUrl] = useState("")
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter()
    const {apiUrl, query} = data

    const isModalOpen = isOpen && type === "messageFile"

    const schema = z.object({
        title: z.string().min(1,{
            message: "Attachment is required!"
        }),
        
    })
    
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            imageUrl: "",
          }
    })
    // The resolver acts as a bridge between react-hook-form and zod. It takes the form data from react-hook-form, validates it using zod based on the defined schema

    const { isSubmitting, isValid } = form.formState
    const [isLoading, setIsLoading] = useState(false)


        const submitValues = async()=>{
        if(imageUploadUrl){
            console.log("values ",{imageUrl: imageUploadUrl})
            try{
                setIsLoading(true)
                const url = qs.stringifyUrl({
                    url: apiUrl || "",
                    query,
                })

                axios.post(url, {content: imageUploadUrl})

                setIsLoading(false)
                toast.success("Attachment uploaded successfully!")
                window.location.reload()
            }catch(error){
                toast.error("Something went wrong!")
                console.log("client error - InitialModal.jsx ", error)
                setIsLoading(false)
            }
        }
    }

    const handleClose = ()=>{
        form.reset();
        onClose()
    }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black overflow-auto">
            <DialogHeader className={"pt-5 px-6 text-center"}>
                <DialogTitle className="font-bold text-2xl text-center">Add an Attachment</DialogTitle>
                <DialogDescription className=" text-zinc-900 text-md">Send a file as a messsage</DialogDescription>
                {/* <Upload/> */}
                {!imageUploadUrl ?
                <UploadDropzone 
                  endpoint="messageFile"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    setImageUploadUrl(res[0].url)
                    // toast.success("Image Uploaded Successfully!")
                  }}
                  onUploadError={(error) => {
                    // Do something with the error.
                    console.log("An error occurred! ", error)
                    toast.error("An error occurred")
                  }}/> :(
                    <div className="w-full flex justify-center">
                        <div className=" w-44 h-32 rounded-sm relative flex justify-center">
                            <Image src={imageUploadUrl} alt="Server Image" className="rounded-md object-cover object-top" fill />
                            <p onClick={()=>setImageUploadUrl("")} className="bg-red-500 text-white font-semibold text-xl absolute px-1.5 py-0 rounded-full right-0 top-0 cursor-pointer">X</p>
                        </div>
                    </div>
                    
                  )}
                    <Button className={`w-full bg-green-700 text-white hover:bg-green-600 transition-all ${isLoading && "bg-green-300"}`} type="button" onClick={submitValues} disabled={isLoading}>Send</Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    
  )
}






