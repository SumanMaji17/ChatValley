import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "../../context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { reducerCases } from "../../context/constants";
import { useNavigate } from "react-router-dom";
import ContextMenu from "../common/ContextMenu";

export default function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const navigate = useNavigate();

  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCordinates({ x: e.pageX - 60, y: e.pageY + 10 });
    setIsContextMenuVisible(true);
  };

  const contextMenuOptions = [
    {
      name: "Logout",
      callback: async () => {
        setIsContextMenuVisible(false);
        navigate("/logout");
      },
    },
  ];

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  return (
    <div className=" h-16 px-4 py-3 flex justify-between items-center">
      <div className=" cursor-pointer">
        <div className=" hidden md:block">
          <Avatar type="sm" image={userInfo?.profileImage} />
        </div>
        <img src="ChatValley.png" alt="ChatValley" height={90} width={120} className=" md:hidden" />
      </div>
      <div className=" flex gap-6">
        <BsFillChatLeftTextFill
          className=" text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className=" text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
            onClick={(e) => showContextMenu(e)}
            id="context-opener"
          />

          {isContextMenuVisible && (
            <ContextMenu
              options={contextMenuOptions}
              cordinates={contextMenuCordinates}
              ContextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}
