import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateProvider } from "../context/StateContext";
import Input from "../components/common/Input";
import Avatar from "../components/common/Avatar";
import { ONBOARD_USER_ROUTE } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { reducerCases } from "../context/constants";

export default function Onboarding() {
  const navigate = useNavigate();
  const [{ userInfo, newUser },dispatch] = useStateProvider();
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("default_avatar.png");

  useEffect(() => {
    if (!newUser && !userInfo?.email) navigate("/login");
    else if (!newUser && userInfo?.email) navigate("/");
  }, [newUser, userInfo, navigate]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo.email;
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id:data.user.id,
              name,
              email,
              profileImage: image,
              status: about,
            },
          });
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className=" bg-panel-header-background h-screen w-screen text-white flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-2">
        <img
          src="ChatValley-unscreen.gif"
          alt="ChatValley"
          width={350}
          height={350}
          className=" -ml-14"
        />
        <span className="text-6xl -ml-16 font-medium">Chat<span className=" text-sky-500">Valley</span></span>
      </div>
      <div className="">
      <h2 className="text-2xl font-semibold">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className=" flex items-center justify-center">
            <button
              className="flex items-center justify-center gap-5 bg-search-input-container-background p-3 rounded-lg font-medium text-xl"
              onClick={onboardUserHandler}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
      </div>
    </div>
  );
}
