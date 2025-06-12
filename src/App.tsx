import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
