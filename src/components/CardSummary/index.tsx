import React from "react";
import { useCartStore } from "../../stores/cartStore";
import { addSells } from "../../service/calls/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const CartSummary = () => {
  const { totalQuantity, products } = useCartStore();
  const navigate = useNavigate();
  const submitSell = async () => {
    const sellProducts = Array.from(products.entries()).map(([id, item]) => ({
      produtoId: id,
      quantidadeComprada: item.quantity,
    }));
    const data = {
      venda: {
        clienteId: 1,
        estado: "progress",
        dataVendaInicio: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        dataVendaFinal: null,
      },
      vendaProdutos: sellProducts,
    };
    try {
      await addSells(data);
      toast.success("Venda feita com sucesso");
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {}
  };
  const total = totalQuantity();
  return (
    <div className="w-full sm:w-80 bg-white shadow-md border rounded-2xl p-6 sticky top-6 self-start">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Resumo do Pedido
      </h2>

      <div className="flex justify-between text-gray-700 mb-2">
        <span>Subtotal</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700 mb-4">
        <span>Frete</span>
        <span>Grátis</span>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => submitSell()}
        className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export { CartSummary };
