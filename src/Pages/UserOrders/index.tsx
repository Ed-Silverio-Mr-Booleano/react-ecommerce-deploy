import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore"; // importa o Zustand

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthStore(); // pega o usuário autenticado dinamicamente

  useEffect(() => {
    if (!user?.id) return;

    axios
      .get(
        `https://ecommer-api-bilabila-deploy-render.onrender.com/api/vendas/user/${user.id}`
      )
      .then((res) => setOrders(res.data))
      .catch(() => alert("Erro ao carregar histórico de pedidos."));
  }, [user?.id]);

  return (
    <div className="max-w-screen-md mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-[#591e00]">
        Histórico de Compras
      </h2>
      {orders.length === 0 && (
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      )}
      {orders.map((order: any) => (
        <div key={order.id} className="bg-white shadow p-4 rounded-lg">
          <p>
            <strong>ID:</strong> {order.id}
          </p>
          <p>
            <strong>Estado:</strong> {order.estado}
          </p>
          <p>
            <strong>Data:</strong>{" "}
            {new Date(order.dataVendaInicio).toLocaleString("pt-AO")}
          </p>
          <p className="mt-2 font-semibold">Produtos:</p>
          <ul className="ml-4 list-disc">
            {order.produtos.map((p: any, index: number) => (
              <li key={index}>
                {p.produto} — Quantidade: {p.quantidadeComprada}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export { UserOrders };
