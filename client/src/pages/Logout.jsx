import React, { useEffect } from "react";
import { useStateProvider } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import { reducerCases } from "../context/constants";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";

export default function Logout() {
  const [{ socket, userInfo }, dispatch] = useStateProvider();
  const navigate = useNavigate();
  useEffect(() => {
    socket.current.emit("signout", userInfo.id);
    dispatch({ type: reducerCases.SET_USER_INFO, userInfo: undefined });
    signOut(firebaseAuth);
    navigate("/login");
  }, [socket]);
  return <div className=" bg-conversation-panel-background"></div>;
}
