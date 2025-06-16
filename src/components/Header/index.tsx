import { FaCartArrowDown, FaUserCircle } from "react-icons/fa";
import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/BilaBila-Logo_Principal.svg";
import { useAuthStore } from "../../stores/authStore";

const Header = () => {
  const totalItems = useCartStore((state) => state.totalQuantity());
  const { isAuthenticated, logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Faixa Promocional */}
      <div className="bg-[#ff5b00] py-2 w-full text-center"></div>

      {/* Header principal */}
      <header className="bg-white shadow-sm py-4 w-full">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4">
          {/* Logo */}
          <img
            src={Logo}
            alt="Logo"
            className="w-14 h-14 object-contain cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Navegação */}
          <nav>
            <ul className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#591e00]">
              <li
                className="hover:text-[#ff5b00] cursor-pointer"
                onClick={() => navigate("/")}
              >
                Produtos
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer"
                onClick={() => navigate("/sobre")}
              >
                Sobre
              </li>
              <li
                className="hover:text-[#ff5b00] cursor-pointer"
                onClick={() => navigate("/meus-pedidos")}
              >
                Meus Pedidos
              </li>

              {/* Carrinho */}
              <li>
                <div
                  className="relative cursor-pointer text-[#591e00] hover:text-[#ff5b00] transition"
                  onClick={() => navigate("/cart")}
                >
                  <FaCartArrowDown size={22} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#ff5b00] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold shadow-md">
                      {totalItems}
                    </span>
                  )}
                </div>
              </li>

              {/* Login ou Usuário Autenticado */}
              <li>
                {isAuthenticated ? (
                  <div className="flex items-center gap-2 text-sm">
                    <FaUserCircle size={20} className="text-[#ff5b00]" />
                    <span className="text-gray-700 font-medium">
                      {user?.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:underline text-xs ml-2"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    className="text-[#591e00] hover:text-[#ff5b00] transition"
                  >
                    Entrar
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export { Header };
