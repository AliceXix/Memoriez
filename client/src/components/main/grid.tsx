import { Grid, GridItem } from "@chakra-ui/react";
import Header from './header';
import BreadcrumbNav from './breadcrumb';
import SideNav from './side.nav';
import AddMemoryForm from '../AddMemoryForm';
import { ReactNode } from "react";

interface Props {
    children?: ReactNode
}


export default function GridLayout({children}: Props) {


    return (
        <>
            <Grid
                h="100vh"
                gap={"5px"}
                gridTemplateRows={` 1fr .5fr 1fr 1fr 1fr 1fr 1fr 1fr .2fr`}
                gridTemplateColumns={` 1fr .5fr 7fr .2fr`}
                gridTemplateAreas={[
                    `"header" "breadCrumb" "form" "sideNav"`,
                    `"header" "breadCrumb" "form" "sideNav"`,
                    `"header header header header"
                    "breadCrumb breadCrumb . ."
                    "sideNav . form ."
                    "sideNav . details ."
                    "sideNav . details ."
                    "sideNav . details ."
                    "sideNav . details ."
                    "sideNav . details ."
                    "sideNav . details ."`,
                ]}
            >
                <GridItem gridArea="sideNav" bg="gray">
                    <SideNav />
                </GridItem>

                <GridItem gridArea="header" bg="tomato">
                    <Header />
                </GridItem>

                <GridItem gridArea="breadCrumb">
                    <div>
                        <BreadcrumbNav />
                    </div>
                </GridItem>

                <GridItem gridArea="form" bg="blue">
                    <AddMemoryForm />
                </GridItem>

                <GridItem gridArea="details">
                    {children}
                </GridItem>
            </Grid>
        </>
    );
}
