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


 export const MyInitialModal = () => {

    const [isMounted, setIsMounted] = useState(false);
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
        setIsMounted(true)
    },[])

    if(!isMounted){
        return null
    }

    const submitValues = async(values:z.infer<typeof schema>)=>{
        if(imageUploadUrl){
            console.log("values ",{name: values.title, imageUrl: imageUploadUrl})
            try{
                const res = await axios.post(`/api/servers`, {name: values.title, imageUrl: imageUploadUrl})

                form.reset()
                toast.success("Server created successfully!")
                window.location.reload()
            }catch(error){
                toast.error("Something went wrong!")
                console.log("client error - InitialModal.jsx ", error)
            }
        }
    }


  return (
    <Dialog open>
        <DialogContent className="bg-white text-black overflow-auto">
            <DialogHeader className={"pt-5 px-6 text-center"}>
                <DialogTitle className="font-bold text-2xl text-center">Customize your server</DialogTitle>
                <DialogDescription className=" text-zinc-900 text-md">Give your server a personality with a name and an image. You can change it later</DialogDescription>
                {/* <Upload/> */}
                {!imageUploadUrl ?
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
                            <Image src={imageUploadUrl} alt="Server Image" className="rounded-full object-cover object-top" fill />
                            <p onClick={()=>setImageUploadUrl("")} className="bg-red-500 text-white font-semibold text-xl absolute px-1.5 py-0 rounded-full right-0 top-0 cursor-pointer">X</p>
                        </div>
                    </div>
                    
                  )}
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(submitValues)}>
                        <FormField name="title" control={form.control}  render={({field})=>{
                            return(
                                <FormItem>
                                    <FormLabel className=" italic font-semibold text-black mt-3">Name your Server</FormLabel>
                                    <FormControl className="bg-white">
                                        <Input disabled={isSubmitting} {...field} placeholder="Enter a server name"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}/>

                        <Button className="w-full" variant="primary" type="submit" disabled={isSubmitting}>Create</Button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    
  )
}




