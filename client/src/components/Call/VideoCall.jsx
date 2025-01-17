import React, { useEffect } from "react";
import { useStateProvider } from "../../context/StateContext";
import Container from "./Container";

export default function VideoCall() {
  const [{ videoCall, socket, userInfo }] = useStateProvider();

  useEffect(() => {
    if (videoCall.type === "out-going") {
      socket.current.emit("outgoing-video-call", {
        to: videoCall.id,
        from: {
          id: userInfo.id,
          profilePicture: userInfo.profileImage,
          name: userInfo.name,
        },
        callType: videoCall.callType,
        roomId: videoCall.roomId,
      });
    }
  }, [videoCall]);

  return <Container data={videoCall} />;
}
