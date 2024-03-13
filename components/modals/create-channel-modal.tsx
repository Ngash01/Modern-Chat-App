"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "../ui/dialog"
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import qs from "query-string"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { ChannelType } from "@prisma/client";


 export const CreateChannelModal = () => {
    const {isOpen, onClose, type}  = useModal()
    const params = useParams()


    const isModalOpen = isOpen && type === "createChannel"
    const router = useRouter()

    const schema = z.object({
        title: z.string().min(1,{
            message: "Channenl name is a required field!"
        }).refine(name=>
            name !== "general",
            {
                message: "channel name cannot be 'general'"
            }
        ),
        type: z.nativeEnum(ChannelType)
    })
    
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            type:ChannelType.TEXT
          }
    })
    // The resolver acts as a bridge between react-hook-form and zod. It takes the form data from react-hook-form, validates it using zod based on the defined schema

    const { isSubmitting, isValid } = form.formState


    const submitValues = async(values:z.infer<typeof schema>)=>{
            console.log("values ",{name: values.title})
            try{
                // const url = qs.stringifyUrl({
                //     url:"/api/channels",
                //     query:{
                //         serverId: params?.serverId
                //     }
                // })
                const res = await axios.post(`/api/channels/${params.serverId}`, {name: values.title})

                console.log("created channel", res)

                form.reset()
                toast.success("Channel created successfully!")
                window.location.reload()
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
                <DialogTitle className="font-bold text-2xl text-center">Create your channel</DialogTitle>
                <DialogDescription className=" text-zinc-900 text-md"></DialogDescription>
                {/* <Upload/> */}
                
                <Form {...form}>
                    <form className="space-y-5" onSubmit={form.handleSubmit(submitValues)}>
                        <FormField name="title" control={form.control}  render={({field})=>{
                            return(
                                <FormItem>
                                    <FormLabel className=" italic font-semibold text-black text-base mt-3">Name your Channel</FormLabel>
                                    <FormDescription className="text-gray-600 text-base">Channels facilitate communication and organization within  a server </FormDescription>
                                    <FormControl className="bg-white">
                                        <Input disabled={isSubmitting} {...field} placeholder="Enter a channel name" className="text-black"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )
                        }}/>

                        <FormField control={form.control} name="type" render={({field})=>{
                            return (
                                <FormItem>
                                    <FormLabel>ChannelType</FormLabel>
                                    <Select>
                                        <SelectTrigger className="w-full bg-gray-200 text-black">
                                            <SelectValue placeholder="Select A Channel Type" className="text-black" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white text-black">
                                            <SelectItem value="light">TEXT</SelectItem>
                                            <SelectItem value="dark">AUDIO</SelectItem>
                                            <SelectItem value="system">VIDEO</SelectItem>
                                        </SelectContent>
                                    </Select>

                                </FormItem>
                            )
                        }}/>

                        <Button className="w-full" variant="primary" type="submit" disabled={isSubmitting}>Create</Button>
                    </form>
                </Form>
            </DialogHeader>
        </DialogContent>
    </Dialog>
    
  )}



