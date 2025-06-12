import { useState } from "react";
import { QuantityControl } from "../QuantityControl";
import { MdDelete } from "react-icons/md";
import { useCartStore } from "../../stores/cartStore";

const CartCard = () => {
  const { products, updateQuantity } = useCartStore();

  // Mapeia produtos do carrinho
  const prodEntries = Array.from(products.entries());

  // Estado de quantidade por produto (mapeado por ID)
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    () => {
      const initialQuantities: { [key: number]: number } = {};
      prodEntries.forEach(([id]) => {
        initialQuantities[id] = 1;
      });
      return initialQuantities;
    }
  );

  const handleIncrease = (id: number) => {
    const productQuantity = quantities[id] ?? 1;
    updateQuantity(id, productQuantity + 1);
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const handleDecrease = (id: number) => {
    const productQuantity = quantities[id] ?? 1;
    updateQuantity(id, Math.max(1, productQuantity - 1));
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));
  };

  return (
    <>
      {prodEntries.map(([id, cart]) => {
        const product = cart.product;
        const quantity = quantities[id] ?? 1;
        const total = (product.preco * quantity).toFixed(2);

        return (
          <div
            key={id}
            className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-2xl shadow-md border bg-white w-full mx-auto mb-4"
          >
            {/* Imagem do produto */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={product.img}
                alt={product.nome}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Informações */}
            <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.nome}
                </h3>
                <p className="text-sm text-gray-500">
                  {" "}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Saepe, fugit ex. Nam, fugit quibusdam animi officia dolore
                </p>
                <div className="mt-1 text-sm text-gray-700">
                  KZ {product.preco.toFixed(2)}
                </div>
              </div>

              {/* Controles */}
              <div className="flex flex-col items-center gap-2">
                <QuantityControl
                  quantity={quantity}
                  onIncrease={() => {
                    handleIncrease(id);
                  }}
                  onDecrease={() => handleDecrease(id)}
                />
                <div className="text-sm text-gray-800">Total: KZ {total}</div>
              </div>
            </div>

            {/* Botão Remover */}
            <button
              className="text-red-500 hover:text-red-600 transition"
              title="Remover item"
              // onClick={() => removeFromCart(id)} // Lógica futura
            >
              <MdDelete size={20} />
            </button>
          </div>
        );
      })}
    </>
  );
};

export { CartCard };
