// import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import * as React from "react";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";

// function App() {
//   // 2. Wrap ChakraProvider at the root of your app
//   return (
//     <ChakraProvider>
//       <App />
//     </ChakraProvider>
//   );
// }

ReactDOM.render(
  <Router>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
