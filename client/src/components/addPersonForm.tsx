import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import * as React from "react";

export default function AddPersonForm(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = React.useState("");
  const userInput: { name: string } = { name: name };
  const user = JSON.parse(localStorage.userId);

  async function addPerson(id: any, input: any) {
    const fetcher: Response = await fetch(
      `http://localhost:3000/api/add-person/${id}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    const newPerson = await fetcher.json();
    return newPerson;
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await addPerson(user._id, userInput);
              }}
            >
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              ></input>
              <Button variant="ghost" type="submit" onClick={props.onClose}>
                Add new person!
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
