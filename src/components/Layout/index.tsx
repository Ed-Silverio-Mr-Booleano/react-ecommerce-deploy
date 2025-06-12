import { Outlet } from "react-router-dom";
import { Header } from "../Header";
const Layout = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center mt-8">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export { Layout };
