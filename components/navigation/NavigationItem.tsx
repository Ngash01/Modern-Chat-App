"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

import React from 'react'
import { ActionTooltip } from "../actionTooltip"
import { cn } from "@/lib/utils"

interface NavigationItemProps{
  id:string,
  name: string,
  imageUrl: string
}

const NavigationItem = ({id, name, imageUrl}:NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const onClick = ()=>{
      router.push(`/servers/${id}`)
    }

  return (
    <div className="mb-3">
      <ActionTooltip label={name} side="right" align="center" >
          <div>
            <button onClick={onClick} className="group relative flex items-center">
              <div className={cn("absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
              params?.serverId !== id && "group-hover:h-[20px]", params?.serverId === id ? "h-[36px]" : "h-[8px]"
              )}/>
              <div className={cn("relative group flex mx-3 h-[53px] w-[53px] rounded-[24px] group-hover:rounded-[16px] transition-all", 
              "overflow-hidden", params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]")} >
                  <Image fill src={imageUrl} className=" object-cover" alt="channel"/>
              </div>
            </button>
          </div>
      </ActionTooltip>
    </div>
  )
}

export default NavigationItem;



