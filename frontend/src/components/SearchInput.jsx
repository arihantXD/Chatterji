import { FiSearch } from "react-icons/fi";
import { Input } from "@nextui-org/react";

const SearchInput = () => {
  return (
    <div>
      <Input
        isClearable
        type="text"
        label="Search People"
        variant="bordered"
        size="sm"
        className="mb-[15px]"
        placeholder="Ex. Arihant"
        onClear={() => console.log("input cleared")}
      />
    </div>
  );
};
export default SearchInput;
