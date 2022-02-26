import { Grid, GridItem } from "@chakra-ui/react";

export default function GridLayout() {
  return (
    <>
      <Grid
        h="100vh"
        templateRows="repeat(22, 1fr)"
        templateColumns="repeat(16, 1fr)"
        gap={0} 
      >
        <GridItem rowStart={4} colSpan={2} rowSpan={19} bg="gray" />
        <GridItem rowStart={1} rowSpan={2} colSpan={16} bg="tomato" />
        <GridItem rowStart={3} colSpan={3} rowSpan={1} bg="papayawhip" />
        <GridItem rowStart={5} colStart={5} colEnd={15} colSpan={4} rowSpan={3} bg="blue" />
      </Grid>
    </>
  );
}
