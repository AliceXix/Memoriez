import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import {
  QueryClientProvider,
  QueryClient
} from 'react-query';

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};
const theme = extendTheme({colors})
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
