import { Card, CardHeader, Image } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import socket from "../utils/socket";

const ChatCard = ({ chat, setSelectedCat, selectedCat }) => {
  const { user } = useContext(myContext);
  const [latestMessage, setLatestMessage] = useState(false);
  useEffect(() => {
    socket.emit("chat-room-created", user._id);
  });

  return (
    <>
      <Card
        shadow="sm"
        radius="sm"
        isPressable
        className="my-3 min-w-full"
        onClick={() => {
          setSelectedCat(() => chat);
        }}
      >
        <CardHeader className="flex gap-3 items-center">
          <Image
            alt="nextui logo"
            height={40}
            radius="full"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="w-full">
            <p className="text-md text-start">
              {user.name === chat.participants[1].name
                ? chat.participants[0].name
                : chat.participants[1].name}
            </p>
            <div className="flex justify-between">
              <span className="text-small text-default-500">
                {chat.latestMessage.message.length >= 30
                  ? `${chat.latestMessage.message.substring(0, 31)}...`
                  : chat.latestMessage.message}
              </span>
              <span className="text-small text-default-500">
                {chat.latestMessage.sentTime}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};
export default ChatCard;
