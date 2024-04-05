import Lottie from "react-lottie";
import { IoIosCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { GoFileSubmodule } from "react-icons/go";
import videoChatAnimation from "../animations/videoChat.json";
import { FaChevronLeft } from "react-icons/fa6";
import { CiPaperplane } from "react-icons/ci";
import { Avatar, Input, ScrollShadow } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../App";
import socket from "../utils/socket";
import axios from "axios";
let selectedChatCompare;
const ChatBox = () => {
  const { selectedCat, setSelectedCat, user, setChats } = useContext(myContext);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: videoChatAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    async function fetchMessages() {
      const { data } = await axios.post("/api/messages/fetch", {
        id: selectedCat._id,
      });
      setMessages(data);
    }
    fetchMessages();
    selectedChatCompare = selectedCat;
  }, [fetchAgain, selectedCat]);

  const sendMessageHandler = async () => {
    const payload = { chat: selectedCat._id, message: input, sender: user._id };
    const { data } = await axios.post("/api/messages/", payload);
    const { data: chats } = await axios.get(`/api/chats/${user._id}`);
    const { data: chat } = await axios.get(`/api/chats/getChat/${data.chat}`);

    setChats(chats);
    setInput("");
    setFetchAgain((prev) => !prev);
    socket.emit("send-new-msg", data, chat);
  };
  useEffect(() => {
    socket.on("sent-new-msg", async (data) => {
      console.log(selectedChatCompare);
      if (!selectedChatCompare || selectedChatCompare._id !== data.chat) {
      } else {
        console.log("msg recieved");
        setMessages([data, ...messages]);
      }
    });
  });
  return (
    <div
      className={`${
        !selectedCat ? "hidden md:block md:w-[100%]" : ""
      } w-[100%] px-[5px]`}
    >
      {selectedCat ? (
        <div className=" h-[calc(100vh-80px)]">
          <div className="rounded-t-md bg-blue text-white px-[10px] py-[9px] flex items-center justify-between gap-5 h-[45px]">
            <div className="flex items-center gap-3 ">
              <FaChevronLeft
                size={25}
                className="cursor-pointer"
                onClick={() => setSelectedCat(false)}
              />
              <div className="flex items-center gap-2">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  size="sm"
                />
                <h5>
                  {user.name === selectedCat.participants[1].name
                    ? selectedCat.participants[0].name
                    : selectedCat.participants[1].name}
                </h5>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <IoIosCall size={23} />
              <IoIosVideocam size={23} />
              <GoFileSubmodule size={23} />
            </div>
          </div>

          <ScrollShadow
            hideScrollBar
            isEnabled={false}
            className="p-3 h-[calc(100%-110px)] flex flex-col-reverse overflow-y-auto"
          >
            {messages &&
              messages.map((message) => (
                <span
                  key={message._id}
                  className={`${
                    message.sender._id === user._id
                      ? "bg-sender self-end"
                      : "bg-receiver self-start"
                  }   py-1 px-4 my-1 rounded-3xl`}
                >
                  {message.message}
                </span>
              ))}
          </ScrollShadow>

          <div className="h-[50px] p-[10px]">
            <Input
              endContent={
                <CiPaperplane
                  className="text-light-blue font-semibold cursor-pointer"
                  size={30}
                  onClick={sendMessageHandler}
                />
              }
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              label="Send a message"
              size="md"
              isRequired
            />
          </div>
        </div>
      ) : (
        <div className="h-[80%] flex flex-col justify-center items-center">
          <Lottie options={defaultOptions} width={400} height={400} />
          <span className="text-[#676767] font-light">
            Click on the chat to start conversation
          </span>
        </div>
      )}
    </div>
  );
};
export default ChatBox;
