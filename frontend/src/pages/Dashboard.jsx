import { useContext, useEffect, useState } from "react";
import { ActivitySection, ChatBox, NavigationBar } from "../components";
import { myContext } from "../App";
import axios from "axios";

export const loader = async () => {
  return null;
};

const Dashboard = () => {
  const { setUser, setChats } = useContext(myContext);
  useEffect(() => {
    async function getUserAndChats(params) {
      const { data: user } = await axios.get("/api/auth/user");
      const { data: chats } = await axios.get(`/api/chats/${user._id}`);
      setChats(() => chats);
      setUser(() => user);
    }
    getUserAndChats();
  });
  return (
    <div className="bg-[#ACE2E1]">
      <NavigationBar />
      <div className="flex w-full">
        <ActivitySection />
        <ChatBox />
      </div>
    </div>
  );
};
export default Dashboard;
