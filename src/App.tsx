// src/App.tsx
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import SplashLoader from "./components/SplashLoader";
import { useAuthStore } from "./stores/authStore";

function App() {
  const { loadStorageData, splashLoading } = useAuthStore();

  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <>
      {splashLoading ? (
        <SplashLoader />
      ) : (
        <BrowserRouter>
          <ToastContainer position="top-right" autoClose={3000} />

          <Routes />
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
