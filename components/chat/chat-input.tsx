"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "../ui/input";
import { Plus, Smile } from "lucide-react";
import toast from "react-hot-toast";
import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import { EmojiPicker } from "../emoji-picker";

interface ChatInputProps{
    apiUrl: string,
    query: Record<string, any>,
    name: string,
    type: "conversation" | "channel"
}

export const ChatInput = ({apiUrl, query, name, type}:ChatInputProps)=>{
    const { onOpen } = useModal()
    const formSchema = z.object({
        content: z.string().min(1)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            content: ""
        }
    })


    const isLoading = form.formState.isSubmitting;

    const submitValues = async(values: z.infer<typeof formSchema>)=>{
        try{
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            })
            
            form.reset()
            await axios.post(url, values);
            window.location.reload()
            window.scrollTo(0, document.body.scrollHeight);
            // toast.success("message successfully sent")
        }catch(err){
            console.log("An error occured!", err)
            toast.error("Something went wrong")
        }
    }

    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitValues)}>
            <FormField name="content" control={form.control} render={({field})=>{
                return(
                    <FormItem>
                       <FormControl>
                        <div className="relative p-4 pb-6">
                            <button type="button" onClick={()=>onOpen("messageFile", {apiUrl, query})} className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400
                             hover:bg-zinc-600 dark:hover:bg-zinc-300 items-center justify-center ">
                                <Plus className="text-white dark:text-[#313338]"/>
                            </button>
                            <Input disabled={isLoading} className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible-ring-0 focus-visible:ring-0
                            focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200
                            " placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                            {...field}/>
                            <div className="absolute top-7 right-6">
                                <EmojiPicker onChange={(emoji:string)=>field.onChange(`${field.value} ${emoji}`)}/>
                            </div> 
                        </div>
                       </FormControl>
                    </FormItem>
                )
            }}/> 
            </form>
        </Form>

    )
}





