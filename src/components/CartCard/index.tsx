import { useCartStore } from "../../stores/cartStore";
import { useNavigate } from "react-router-dom";

const CartCard = () => {
  const { products, removeProduct } = useCartStore();
  const navigate = useNavigate();

  const cartItems = Array.from(products.entries());

  if (cartItems.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-600">
        <p className="text-xl font-semibold mb-2">
          🛒 Seu carrinho está vazio!
        </p>
        <p className="text-sm mb-4">
          Adicione alguns produtos para começar sua compra.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#ff5b00] text-white rounded-xl font-medium hover:bg-[#e04e00] transition"
        >
          Ver Produtos
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cartItems.map(([id, item]) => (
        <div
          key={id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{item.product.nome}</p>
            <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
          </div>
          <button
            onClick={() => removeProduct(id)}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};

export { CartCard };
