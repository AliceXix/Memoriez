import * as React from "react";
import { Button } from "@chakra-ui/react";
import { UserData } from "./main/side.nav";
import { personData } from "./person.details";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function AddMemoryForm(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [person, setPerson] = React.useState<personData>({
    memories: [
      {
        author: [""],
        person: [""],
        text: "",
        title: "",
        _id: "",
      },
    ],
    name: "",
    relationship: [""],
    _id: "",
  });
  const [memoryCount] = React.useState("0");
  const [user, setUser] = React.useState<null | UserData>();

  let userData: any = localStorage.getItem("userId");
  userData = JSON.parse(userData);

  const author = userData._id;

  const userInput: {
    title: string;
    text: string;
    person: personData;
    author: string;
  } = {
    title: title,
    text: text,
    person: person,
    author: author,
  };

  /**updates the memory count**/
  localStorage.setItem("memoryWidgetUpdate", memoryCount);

  async function getProfileInfos(id: string) {
    const fetcher: Response = await fetch(
      `http://localhost:3000/api/user/${id}`,
      {
        method: "GET",
      }
    );
    const data: UserData = await fetcher.json();
    setUser(data);

    return data;
  }

  React.useEffect(() => {
    if (userData._id) {
      getProfileInfos(userData._id);
    }
  }, [userData._id]);

  async function addMemory(id: any, input: any) {
    const fetcher: Response = await fetch(
      `http://localhost:3000/api/add-memory/${id}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(input),
      }
    );

    return await fetcher.json();
  }

  async function handleValidation() {
    if (!person) {
      return alert("please assign a person of your circle to this memory");
    }
    await addMemory(userData._id, userInput);
  }

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <section className="memory-detail-widget">
              <form
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  await handleValidation();
                }}
              >
                <Menu>
                  {({ isOpen }: { isOpen: boolean }) => (
                    <>
                      <MenuButton isActive={isOpen} as={Button} rightIcon="v">
                        {isOpen ? "Close" : "Open"}
                      </MenuButton>

                      <MenuList>
                        {user?.user?.circle.map((elm: personData) => {
                          if (!elm) return null;
                          return (
                            <MenuItem
                              onClick={() => {
                                setPerson(elm);
                              }}
                            >
                              {elm.name}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </>
                  )}
                </Menu>

                <div className="addmemoryform-title">
                  <label htmlFor="title"></label>
                  <input
                    id="title"
                    type="text"
                    placeholder="title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTitle(e.target.value)
                    }
                  ></input>
                </div>

                <label htmlFor="text"></label>

                <textarea
                  id="text"
                  name="text"
                  placeholder="memory"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                ></textarea>

                <Button variant="ghost" type="submit" onClick={props.onClose}>
                  Submit
                </Button>
              </form>
            </section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
