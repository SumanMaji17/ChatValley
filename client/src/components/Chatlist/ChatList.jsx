import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import List from "./List";
import ChatListHeader from "./ChatListHeader";
import { useStateProvider } from "../../context/StateContext";
import ContactsList from "./ContactsList";

export default function ChatList() {
  const [{ contactsPage }] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);
  return (
    <div className=" bg-panel-header-background flex flex-col h-screen lg:max-h-screen w-full  z-20">
      {pageType === "default" && (
        <>
          <ChatListHeader />
          <SearchBar />
          <List />
        </>
      )}
      {pageType === "all-contacts" && <ContactsList />}
    </div>
  );
}
