// src/components/Layout.tsx
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { Footer } from "../Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-1 flex justify-center mt-4 px-4">
        <div className="w-full max-w-screen-xl">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export { Layout };
