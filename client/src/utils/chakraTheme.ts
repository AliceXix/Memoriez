import { extendTheme } from "@chakra-ui/react";

const ChakraTheme = extendTheme({
  components: {
    Input: {
      variants: {
        "altered-flush": {
          border: "5px solid red",
          bg: "red.400",
        },
      },
    },
  },
});

export default ChakraTheme;