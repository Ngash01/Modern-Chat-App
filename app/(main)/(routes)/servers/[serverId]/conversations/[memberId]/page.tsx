import { ChatHeader } from '@/components/chat/chat-header'
import { ChatInput } from '@/components/chat/chat-input'
import { ChatMessages } from '@/components/chat/chat-messages'
import { currentProfile } from '@/components/lib/current-profile'
import { getOrCreateConversation } from '@/lib/conversation'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'


interface MemberIdPageProps{
  params:{
    memberId: string
    serverId: string
  }
}

const MemberIdPage = async({params}:MemberIdPageProps) => {
  const profile = await currentProfile();

  if(!profile){
    return redirect("/sign-in")
  }

  const currentMember = await db.member.findFirst({
    where:{
      serverId:params.serverId,
      profileId: profile.id
    }
  })

  if(!currentMember){
    return redirect("/")
  }

  const conversation = await getOrCreateConversation(currentMember.id, params.memberId)
  // looking at a combination of our currently loggedIn user and the member that we clicked on

  if(!conversation){
    return redirect(`/servers/${params.serverId}`)
  }

  const { memberOne, memberTwo } = conversation

  const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne

  return (
    <div className='bg-white dark:bg-[#242629] flex flex-col h-full'>
      <ChatHeader imageUrl={otherMember.profile.imageUrl} name={otherMember.profile.name} serverId={params.serverId} type='conversation'/>
      <ChatMessages member={currentMember} name={otherMember.profile.name} 
      chatId={conversation.id} type='conversation' apiUrl='/api/direct-messages' 
      paramKey='conversationId' paramValue={conversation.id} socketUrl='/api/socket/direct-messages'
      socketQuery={{conversationId: conversation.id}}/>
      <ChatInput name={otherMember.profile.name} type="conversation" apiUrl='/api/socket/direct-messages' query={{conversationId:conversation.id}}/>
    </div>
  )
}

export default MemberIdPage;

