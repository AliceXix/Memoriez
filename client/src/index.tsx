import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import ChakraTheme from "./utils/chakraTheme";

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};

const Modal = {
  sizes: { md: { dialog: { maxW: "700px" } } },
};

const Input = {
  variants: {
    "altered-flush": {
      field: {
        bg: "none",
        borderBottom: "2px solid black",
        borderRadius: "none",
        width: "100%",
        _placeholder: {
          opacity: 2,
          color: "gray",
        },
      },
      addon: {
        border: "none",
      },
    },
  },
};


const theme = extendTheme({ colors, components: { Modal, Input },  });
const queryClient = new QueryClient();

ReactDOM.render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </QueryClientProvider>
    </Router>,
    document.getElementById("root")
);

reportWebVitals();
