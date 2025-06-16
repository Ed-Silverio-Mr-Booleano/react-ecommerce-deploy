import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filtro, setFiltro] = useState("todos");
  const [clienteFiltro, setClienteFiltro] = useState("");

  useEffect(() => {
    axios
      .get("https://ecommer-api-bilabila-deploy-render.onrender.com/api/vendas")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Erro ao buscar vendas:", err));
  }, []);

  const filtrar = () =>
    orders.filter((v) => {
      const estadoMatch = filtro === "todos" || v.estado === filtro;
      const clienteMatch =
        clienteFiltro === "" || v.clienteId.toString() === clienteFiltro;
      return estadoMatch && clienteMatch;
    });

  const alterarEstado = async (id: number, novoEstado: string) => {
    try {
      await axios.put(
        `https://ecommer-api-bilabila-deploy-render.onrender.com/api/vendas/${id}/status?estado=${novoEstado}`
      );
      setOrders((prev) =>
        prev.map((v) => (v.id === id ? { ...v, estado: novoEstado } : v))
      );
    } catch {
      alert("Erro ao mudar estado do pedido.");
    }
  };

  const alterarTransacao = async (idVenda: number, novoEstado: string) => {
    try {
      await axios.put(
        `https://ecommer-api-bilabila-deploy-render.onrender.com/api/transacoes/${idVenda}/status?estado=${novoEstado}`
      );
      setOrders((prev) =>
        prev.map((v) =>
          v.id === idVenda
            ? {
                ...v,
                transacao: { ...v.transacao, estado: novoEstado },
              }
            : v
        )
      );
    } catch {
      alert("Erro ao mudar estado da transação.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-[#f5f5f4]">
      <h2 className="text-3xl font-bold mb-6 text-[#591e00]">📦 Pedidos</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border p-2 rounded w-[180px]"
        >
          <option value="todos">Todos</option>
          <option value="progress">Em progresso</option>
          <option value="ready">Pronto</option>
          <option value="completed">Concluído</option>
        </select>
        <input
          type="text"
          placeholder="Filtrar por clienteId"
          value={clienteFiltro}
          onChange={(e) => setClienteFiltro(e.target.value)}
          className="border p-2 rounded w-[200px]"
        />
      </div>

      {filtrar().length === 0 && (
        <p className="text-gray-500">Nenhum pedido encontrado.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtrar().map((venda) => (
          <div
            key={venda.id}
            className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-[#591e00]">
                Pedido #{venda.id}
              </h4>
              <span className="text-xs text-gray-500">
                {new Date(venda.dataVendaInicio).toLocaleString()}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              Cliente ID: <strong>{venda.clienteId}</strong>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Estado:{" "}
              <span className="font-semibold text-blue-700">
                {venda.estado}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Pagamento:{" "}
              <span className="font-semibold text-green-700">
                {venda.transacao?.estado || "N/A"}
              </span>
            </p>

            <p className="text-sm font-medium text-gray-800">Produtos:</p>
            <ul className="list-disc ml-6 text-sm text-gray-700 mb-3">
              {venda.produtos.map((p: any) => (
                <li key={p.produto}>
                  {p.produto} — x{p.quantidadeComprada}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => alterarEstado(venda.id, "ready")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs shadow"
              >
                Pronto
              </button>
              <button
                onClick={() => alterarEstado(venda.id, "completed")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs shadow"
              >
                Concluir
              </button>
              <button
                onClick={() => alterarTransacao(venda.id, "completed")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs shadow"
              >
                Pagar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
