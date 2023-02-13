import { BrowserRouter } from "react-router-dom";
import Routing from "./routes";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
