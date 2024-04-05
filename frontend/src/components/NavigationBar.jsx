import { RxAvatar } from "react-icons/rx";
import Logo from "./Logo";
import { useContext } from "react";
import { myContext } from "../App";

const NavigationBar = () => {
  const { user } = useContext(myContext);
  return (
    <div className="h-[60px] px-2 flex justify-between items-center">
      <Logo />
      <div className="flex items-center gap-7 text-sm">
        <span>Add People</span>
        <span>Contact Us</span>
        <RxAvatar size={20} />
      </div>
    </div>
  );
};
export default NavigationBar;
