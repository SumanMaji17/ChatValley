import React from 'react'
import ChatContainer from './ChatContainer'
import MessageBar from './MessageBar'
import ChatHeader from './ChatHeader'

export default function Chat() {
  return (
    <div className=' border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col h-[100vh] z-0'>
        <ChatHeader/>
        <ChatContainer/>
        <MessageBar/>      
    </div>
  )
}
