import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// remove strict mode to prevent useEffect running twice in <App />
root.render(<App />);
