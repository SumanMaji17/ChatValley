import React, { useEffect, useRef } from "react";
import { useStateProvider } from "../../context/StateContext";
import MessageStatus from "../common/MessageStatus";
import { calculateTime } from "../../utils/CalculateTime";
import ImageMessage from "./ImageMessage";
import VoiceMessage from "./VoiceMessage";
import { decryptData } from "../../utils/EncryptDecryptData";

export default function ChatContainer() {
  const [{ messages, currentChatUser, userInfo }] = useStateProvider();
  const messageEnd = useRef();

  useEffect(() => {
    messageEnd.current?.scrollIntoView();
  }, [messages]);
  return (
    <div className=" h-[75vh] w-full relative flex-grow overflow-auto custom-scrollbar">
      <div className=" bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0  top-0 z-0 "></div>
      <div className=" mx-10 my-6 relative bottom-0 left-0">
        <div className=" flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto custom-scrollbar">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={` flex ${
                  message.senderId === currentChatUser.id
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {message.type === "text" && (
                  <div
                    className={` text-white px-2 py-[5px] text-sm rounded-md flex gap-2 max-w-[45%] ${
                      message.senderId === currentChatUser.id
                        ? "bg-incoming-background"
                        : "bg-outgoing-background"
                    }`}
                  >
                    <span className=" break-all flex items-start justify-start">{decryptData(message?.message)}</span>
                    <div className=" flex gap-1 items-end justify-end mt-2">
                      <span className=" text-bubble-meta text-[11px] pt-1 min-w-fit">
                        {calculateTime(message.createdAt)}
                      </span>
                      <span>
                        {message.senderId === userInfo.id && (
                          <MessageStatus
                            messageStatus={message.messageStatus}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                )}
                {message.type==="image" && <ImageMessage message={message}/>}
                {message.type==="audio" && <VoiceMessage message={message} />}
              </div>
            ))}
            <div ref={messageEnd} />
          </div>
        </div>
      </div>
    </div>
  );
}
