import { Grid, GridItem } from "@chakra-ui/react";
import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userData } from "./main/dashboard";
import { personData } from "./person.details";

export interface memoryData {
    title: string;
    text: string;
    author: userData[];
    person: personData[];
}

interface MemoryDetailsProps {
    children?: React.ReactNode;
}

export default function MemoryDetails({children}: MemoryDetailsProps) {
    const [memory, setMemory] = React.useState<null | memoryData>();
    const navigate = useNavigate();
    let { id } = useParams();


    async function getMemory(id: any) {
        const fetcher = await fetch(
            `http://localhost:3000/api/memory-details/${id}`,
            {
            method: "GET",
            }
        );
        const data: memoryData = await fetcher.json();
        setMemory(data);

        return data;
    };

    React.useEffect(() => {
        getMemory(id);
    }, [id]);


    return (
        <>
            <Grid
                h="100%"
                gap={1.5}
                gridTemplateRows={` .2fr 1fr .05fr`}
                gridTemplateColumns={`1fr`}
                gridTemplateAreas={[
                    `"."`,
                    `"."`,
                    `"title"
                    "text"
                    "button"`,
                ]}
            >
                <GridItem gridArea="title" bg="purple">
                    <h2>Memory title: {memory?.title}</h2>
                </GridItem>

                <GridItem gridArea="text" bg="orange">
                    <p>{memory?.text}</p>
                </GridItem>

                <GridItem gridArea="button">
                    <button
                        className="button-back"
                        onClick={() => {
                        navigate(-1);
                        }}
                    >
                        Back
                    </button>
                </GridItem>
            </Grid>
        </>
    );
}