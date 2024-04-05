import { useContext, useEffect } from "react";
import ChatCard from "./ChatCard";
import { myContext } from "../App";
const PeopleList = () => {
  const { setSelectedCat, user, chats } = useContext(myContext);
  return (
    <div className="">
      {chats &&
        chats.map((chat) => {
          return (
            <ChatCard
              key={chat._id}
              setSelectedCat={setSelectedCat}
              chat={chat}
            />
          );
        })}
    </div>
  );
};
export default PeopleList;
