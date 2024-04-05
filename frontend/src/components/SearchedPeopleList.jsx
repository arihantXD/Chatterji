import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { useContext } from "react";
import { myContext } from "../App";
import axios from "axios";
import toast from "react-hot-toast";

const SearchedPeopleList = ({ person, onClose, setInput, setResult }) => {
  const { setFetchChats, user, setChats } = useContext(myContext);
  async function fetchChats() {
    const { data: chats } = await axios.get(`/api/chats/${user._id}`);
    console.log(chats);
    console.log("-------------------lolololololololo-----------------");
    setChats(() => chats);
  }
  const createChatHandle = async () => {
    const participants = { sender: user._id, receiver: person._id };
    try {
      const data = await axios.post("/api/chats", participants);
      if (data.status === 200) {
        toast.success("User is already in your friend list");
      } else {
        toast.success("User added to friend list");
      }
      onClose((prev) => !prev);
      fetchChats();
      setInput("");
      setResult(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      shadow="sm"
      className="min-w-[300px] w-[90%] mx-auto my-[5px]"
      isPressable
      onPress={createChatHandle}
    >
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={30}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={30}
        />
        <div className="flex flex-col">
          <p className="text-base self-start">{person.name}</p>
          <p className="text-small text-default-500">{person.email}</p>
        </div>
      </CardHeader>
      <Divider />
    </Card>
  );
};
export default SearchedPeopleList;
