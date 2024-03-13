import { db } from "@/lib/db";
import { currentProfile } from "../lib/current-profile"
import { redirect } from "next/navigation";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./NavigationItem";
import { NavigationAction } from "./navigationAction";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSideBar = async()=>{

    const profile = await currentProfile();

    if(!profile) {
        return redirect("/")
    }

    const servers = await db.server.findMany({
        where:{
            members: {
                some:{
                    profileId: profile.id
                }
            }
        }
    })

    return(
        <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-[#E3E5E8] mt-1">
            <NavigationAction/>
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {servers.map((server)=>{
                    return(
                        <div key={server.id} className="space-y-4">
                            <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl}/>
                        </div>
                    )
                })}
            </ScrollArea>
            <div className="pb-3 mt-auto flex flex-col items-center gap-3">
                <ModeToggle/>
                <UserButton  appearance={{elements: {avatarBox: "h-[48px] w-[48px]"}}}/>
            </div>
        </div>
    )
}







