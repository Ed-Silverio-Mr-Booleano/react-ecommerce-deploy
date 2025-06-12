import { FaCartArrowDown } from "react-icons/fa";
import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const totalProductsInCart = useCartStore((state) => state.totalQuantity());
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-black p-3 w-full">
        <p className="text-white text-sm text-center">
          20% descontos em todos os produtos na semana
        </p>
      </div>
      <div className="w-full h-[70px] bg-white flex items-center justify-center ">
        <div className="flex  justify-between px-4 items-center container">
          <div>
            <h2 className="font-semibold">Compra Aqui</h2>
          </div>
          <div>
            <ul className="flex space-x-6 text-sm">
              <li>Produtos</li>
              <li>Sales</li>
              <li>Sobre</li>
              <li>
                <div
                  className="relative w-8 h-8"
                  onClick={() => navigate("/cart")}
                >
                  <FaCartArrowDown />
                  <p className="text-sm">{totalProductsInCart}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export { Header };
