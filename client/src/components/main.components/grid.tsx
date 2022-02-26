import { Grid, GridItem } from "@chakra-ui/react";
import Header from './header';
import BreadcrumbNav from './breadcrumb';
import SideNav from './side.nav';
import MemoryCreateCard from './memory.create.card';

export default function GridLayout() {
  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(22, 1fr)"
        templateColumns="repeat(16, 1fr)"
        gap={0} 
      >
          <GridItem rowStart={4} colSpan={2} rowSpan={19} bg="gray">
            <SideNav/>
          </GridItem>
        <GridItem rowStart={1} rowSpan={2} colSpan={16} bg="tomato">
            <Header/>
        </GridItem>
        <GridItem rowStart={3} colSpan={3} rowSpan={1} bg="papayawhip">
            <BreadcrumbNav/>
        </GridItem>
        <GridItem rowStart={5} colStart={5} colEnd={15} colSpan={4} rowSpan={3} bg="blue">
            <MemoryCreateCard/>
        </GridItem>
      </Grid>
    </>
  );
}
