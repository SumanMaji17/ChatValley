import React from "react";
import { FaLock } from "react-icons/fa";

export default function Empty() {
  return (
    <div className=" border-conversation-border border-l w-full bg-panel-header-background flex flex-col h-[100vh] border-b-4 border-b-icon-green  justify-center">
      <div className=" flex justify-center items-center">
        <img
          src="ChatValley-unscreen.gif"
          alt="ChatValley"
          height={300}
          width={300}
          className=" z-10"
        />
        <img
          src="ChatValley.png"
          alt="ChatValley"
          height={270}
          width={270}
          className=" relative right-20"
        />
      </div>
      <div className=" flex justify-center text-bubble-meta items-center gap-2 opacity-70">
        <FaLock />
        <span>Your personal messages are end-to-end encrypted</span>
      </div>
    </div>
  );
}
