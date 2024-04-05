import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "../spinner/Spinner";
import SearchedPeopleList from "../SearchedPeopleList";

const AddPeopleModal = ({ isOpen, onOpen, onOpenChange }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/findUsers", {
        searchedPeople: input,
      });
      setLoading(false);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="min-w-[300px] w-[90%]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add people
              </ModalHeader>
              <ModalBody>
                <Input
                  color="danger"
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  label="Name or Email"
                  placeholder="Find people by Email or Name"
                  variant="bordered"
                />
              </ModalBody>
              {result && result.length === 0 ? (
                <div className="w-[90%] mx-auto my-3">
                  <span className="font-medium text-medium text-center">
                    No result found, please retry.
                  </span>
                </div>
              ) : (
                result &&
                result.map((person) => {
                  return (
                    <SearchedPeopleList
                      key={person._id}
                      setInput={setInput}
                      setResult={setResult}
                      onClose={onClose}
                      person={person}
                    />
                  );
                })
              )}
              <ModalFooter>
                <Button
                  isLoading={loading}
                  color="danger"
                  variant="solid"
                  onClick={searchHandler}
                  spinner={<Spinner />}
                >
                  Search
                </Button>
                <Button variant="solid" color="default" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddPeopleModal;
