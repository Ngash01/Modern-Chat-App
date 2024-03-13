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
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";


 export const EditServerModal = () => {
    const {isOpen, onClose, type, data}  = useModal()
    const { server } = data

    const isModalOpen = isOpen && type === "editServer"

    const [imageUploadUrl, setImageUploadUrl] = useState("")
    const router = useRouter()

    const schema = z.object({
        title: z.string().min(1,{
            message: "Title is a required field!"
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

     useEffect(()=>{
        if(server){
            form.setValue("title", server.name)
            form.setValue("imageUrl", server.imageUrl)
        }
    },[server, form])

    const submitValues = async(values:z.infer<typeof schema>)=>{
            console.log("values ",{name: values.title})
            try{
                const res = await axios.patch(`/api/servers/${server?.id}`, {name: values.title, imageUrl: imageUploadUrl})

                toast.success("Server Renamed successfully!")
            }catch(error){
                toast.error("Something went wrong!")
                console.log("client error - InitialModal.jsx ", error)
            }
        }

    const handleClose = ()=>{
        form.reset
        onClose()
    }


  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black overflow-auto">
            <DialogHeader className={"pt-5 px-6 text-center"}>
                <DialogTitle className="font-bold text-2xl text-center">Manage your server</DialogTitle>
                <DialogDescription className=" text-zinc-900 text-md">Give your server a personality with a name and an image. You can change it later</DialogDescription>
                {/* <Upload/> */}
                {!server?.imageUrl ?
                <UploadDropzone 
                  endpoint="serverImage"
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
                        <div className=" w-32 h-32 rounded-lg relative flex justify-center">
                            <Image src={server.imageUrl} alt="Server Image" className="rounded-full object-cover object-top" fill />
                            {/* <p onClick={()=>("")} className="bg-red-500 text-white font-semibold text-xl absolute px-1.5 py-0 rounded-full right-0 top-0 cursor-pointer">X</p> */}
                        </div>
                    </div>
                    
                  )}
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(submitValues)}>
                        <FormField name="title" control={form.control}  render={({field})=>{
                            return(
                                <FormItem>
                                    <FormLabel className=" italic font-semibold text-black mt-3">Rename your Server</FormLabel>
                                    <FormControl className="bg-white">
                                        <Input disabled={isSubmitting} {...field} placeholder="Enter a server name"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}/>

                        <Button className="w-full" variant="primary" type="submit" disabled={isSubmitting}>Update</Button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    
  )
}




