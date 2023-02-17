import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// remove strict mode to prevent useEffect running twice in <App />
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);
