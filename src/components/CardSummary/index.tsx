import React, { useState } from "react";
import { useCartStore } from "../../stores/cartStore";
import { useAuthStore } from "../../stores/authStore";
import { addSells } from "../../service/calls/products";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";

const CartSummary = () => {
  const { products, totalQuantity, totalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [tipoPagamentoId, setTipoPagamentoId] = useState(1);

  const submitSell = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para finalizar a compra.");
      return;
    }

    const sellProducts = Array.from(products.entries()).map(([id, item]) => ({
      produtoId: id,
      quantidadeComprada: item.quantity,
    }));

    const data = {
      venda: {
        clienteId: user?.id,
        estado: "progress",
        dataVendaInicio: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        dataVendaFinal: null,
      },
      vendaProdutos: sellProducts,
      transacao: {
        tipoPagamentoId,
        estado: "pending",
      },
    };

    try {
      await addSells(data);
      clearCart();
      toast.success("Compra finalizada com sucesso!");
      await axios.put(
        `https://ecommer-api-bilabila-deploy-render.onrender.com/api/transacoes/${vendaId}/status?estado=completed`
      );

      setTimeout(() => navigate("/meus-pedidos"), 800);
    } catch (error) {
      toast.error("Erro ao finalizar a compra. Tente novamente.");
    }
  };

  const total = totalPrice();

  return (
    <div className="w-full sm:w-80 bg-white shadow-md border border-gray-200 rounded-2xl p-6 sticky top-6 self-start font-poppins">
      <h2 className="text-xl font-semibold text-[#591e00] mb-4">
        Resumo do Pedido
      </h2>

      <div className="flex justify-between text-gray-700 mb-2 text-sm">
        <span>Subtotal</span>
        <span>KZ {total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-gray-700 mb-4 text-sm">
        <span>Frete</span>
        <span className="text-green-600 font-medium">Grátis</span>
      </div>

      <div className="border-t pt-4 flex justify-between text-lg font-bold text-[#591e00]">
        <span>Total</span>
        <span>KZ {total.toFixed(2)}</span>
      </div>

      <div className="mt-6">
        <label className="block mb-2 text-sm text-gray-700 font-medium">
          Método de Pagamento
        </label>
        <select
          value={tipoPagamentoId}
          onChange={(e) => setTipoPagamentoId(Number(e.target.value))}
          className="w-full p-2 border rounded-lg text-sm"
        >
          <option value={1}>Transferência Bancária</option>
          <option value={2}>Dinheiro na Entrega</option>
        </select>
      </div>

      <button
        onClick={submitSell}
        className="mt-6 w-full bg-[#ff5b00] hover:bg-[#e35300] transition text-white font-semibold py-2 rounded-xl"
      >
        Finalizar Compra
      </button>
    </div>
  );
};

export { CartSummary };
