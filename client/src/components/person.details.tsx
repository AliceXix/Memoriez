import * as React from "react";
import MemoryWidget from "./memory.widget";
import { useParams } from "react-router-dom";
import { Grid, GridItem } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";

export interface personData {
  memories: {
    author: string[],
    person: string[],
    text: string,
    title: string,
    _id: string
  }[];
  name: string;
  relationship: string[];
  _id: string;
}

export interface PersonDetailsProps {
  children?: React.ReactNode;
}


export default function PersonDetails({ children }: PersonDetailsProps) {
    const [person, setPerson] = React.useState<null | personData>();
    let { id } = useParams();


    async function getPersonDetails(id: any) {
        const fetcher: Response = await fetch(
            `http://localhost:3000/api/person-details/${id}`,
            {
                method: "GET",
            }
        );
        const data: personData = await fetcher.json();
        setPerson(data);

        return data;
    }

    React.useEffect(() => {
        getPersonDetails(id);
    }, [id]);


return (
    <>
        <Grid
            h="100%"
            gap={1.5}
            gridTemplateRows={` 2fr 2fr 2fr .05fr`}
            gridTemplateColumns={` 1fr 2fr 2fr`}
            gridTemplateAreas={[
                `". . ."`,
                `"..."`,
                `"personDetails details details"
                "personDetails details details"
                "personDetails details details"`,
            ]}
        >
            <GridItem bg="tomato" gridArea="personDetails">
                {person?.name}
                {person?.relationship}
            </GridItem>

            <GridItem gridArea="details" bg="blue">
                <div className="scrollable">
                    <Wrap spacing="30px" bg="yellow" height="70vh">
                        {person?.memories.map((elm) => {
                            return (
                                <WrapItem height="180px" width="30%" bg="purple">
                                    <MemoryWidget key={elm._id} title={elm.title} _id={elm._id} />
                                </WrapItem>
                            );
                        })}
                    </Wrap>
                </div>
            </GridItem>
        </Grid>
    </>
);
}