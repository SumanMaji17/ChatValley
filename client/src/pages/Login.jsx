import React, { useEffect } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { firebaseAuth } from "../utils/FirebaseConfig";
import { CHECK_USER_ROUTE } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../context/constants";

export default function Login() {
  const navigate = useNavigate();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  useEffect(() => {
    if (userInfo?.id && !newUser) navigate("/");
  }, [userInfo, newUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "",
            },
          });
          navigate("/onboarding");
        } else {
          const {
            id,
            name,
            email,
            profilePicture: profileImage,
            status,
          } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status,
            },
          });
          navigate("/");
        }
      }
    } catch (err) {
      console.log("Caught error Popup closed");
    }
  };
  return (
    <div className=" ">
      <div className="flex justify-center items-center bg-panel-header-background h-screen w-screen flex-col gap-6">
        <div className=" hidden md:flex items-center justify-center  text-white -ml-28">
          <img
            src="ChatValley-unscreen.gif"
            alt=""
            className=" z-10 relative left-11 w-[400px] h-[400px]"
          />
          <img
            src="ChatValley.png"
            alt="ChatValley"
            className=" relative right-16 h-[400px] w-[400px]"
          />
        </div>
        <div className=" flex flex-col md:hidden items-center justify-center  text-white">
          <img
            src="ChatValley.png"
            alt="ChatValley"
            className=" relative top-20 h-[300px] w-[300px]"
          />
          <img
            src="ChatValley-unscreen.gif"
            alt=""
            className=" relative -top-20 z-10 w-[250px] h-[250px]"
          />
        </div>
        <button
          className="flex items-center justify-center gap-5 bg-search-input-container-background p-2 rounded-lg"
          onClick={(e) => handleLogin(e)}
        >
          <FcGoogle size="2.5rem" />
          <span className=" text-white text-lg font-medium">
            Login with Google
          </span>
        </button>
      </div>
    </div>
  );
}
