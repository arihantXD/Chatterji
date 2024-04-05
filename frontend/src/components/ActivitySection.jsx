import { ScrollShadow, useDisclosure } from "@nextui-org/react";
import PeopleList from "./PeopleList";
import SearchInput from "./SearchInput";
import { myContext } from "../App";
import { IoPersonAdd } from "react-icons/io5";
import { useContext } from "react";
import AddPeopleModal from "./modals/AddPeopleModal";

const ActivitySection = () => {
  const { selectedCat } = useContext(myContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div
      className={`${
        selectedCat ? "hidden" : "block w-[100%]"
      } md:block md:w-[60%] md:min-w-[320px]  px-[10px]`}
    >
      <SearchInput />
      <div className="px-[10px] text-lg flex justify-between items-center">
        <span className="">Your chats</span>
        <IoPersonAdd onClick={onOpen} className="cursor-pointer" size={20} />
      </div>
      <AddPeopleModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <ScrollShadow hideScrollBar className="h-[calc(100vh-170px)] px-2">
        <PeopleList />
      </ScrollShadow>
    </div>
  );
};
export default ActivitySection;
