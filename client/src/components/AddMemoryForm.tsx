import * as React from "react";
import { Button } from "@chakra-ui/react";
import { userData } from "./main/side.nav";
import { personData } from "./person.details";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";

export default function AddMemoryForm() {
    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [person, setPerson] = React.useState<string[]>([]);
    const [memoryCount, setMemoryCount] = React.useState("0");
    const [user, setUser] = React.useState<null | userData>();
    const userInput: { title: string; text: string; person: string[] } = {
        title: title,
        text: text,
        person: person,
    };
    let userId: string | null = localStorage.getItem("userId");
    const memoryCountUpdate = localStorage.setItem(
        "memoryWidgetUpdate",
        memoryCount
    );
    console.log(memoryCount);


    async function getProfileInfos(id: string) {
        const fetcher: Response = await fetch(`http://localhost:3000/api/user/${id}`, {
            method: "GET",
        });
        const data: userData = await fetcher.json();
        setUser(data);

        return data;
    }

    React.useEffect(() => {
        if (userId) {
            getProfileInfos(userId);
        }
    }, [userId]);


    async function addMemory(id: any, input: any) {
        const fetcher: Response = await fetch(`http://localhost:3000/api/add-memory/${id}`, {
            headers: {
                "Content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(input),
        });

        return await fetcher.json();
    }


    async function handleValidation() {
        if (person.length === 0) {
            return alert("please assign a person of your circle to this memory");
        }

        await addMemory(userId, userInput);
    }
    

    return (
        <>
            <form
                onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    await handleValidation();
                }}
            >
                <Menu>
                    {({ isOpen }: {isOpen: boolean}) => (
                        <>
                            <MenuButton isActive={isOpen} as={Button} rightIcon="v">
                                {isOpen ? "Close" : "Open"}
                            </MenuButton>

                            <MenuList>
                                {user?.user?.circle.map((elm: personData) => {
                                    if (!elm) return null
                                    return (
                                        <MenuItem
                                            onClick={() => {
                                                setPerson([elm._id]);
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

                <label htmlFor="title"></label>
                <input
                    id="title"
                    type={"text"}
                    placeholder="title"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    }
                ></input>

                <label htmlFor="text"></label>
                <input
                    id="text"
                    type={"text"}
                    placeholder="memory"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setText(e.target.value);
                    }}
                ></input>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
