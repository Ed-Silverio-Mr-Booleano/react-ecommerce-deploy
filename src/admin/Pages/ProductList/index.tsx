import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface IProduct {
  id: string;
  nome: string;
  preco: number;
  estoque: number;
}

const ProductList = () => {
  const navigate = useNavigate();

  // Simulação de dados (substituir com fetch futuramente)
  const [produtos, setProdutos] = useState<IProduct[]>([]);

  useEffect(() => {
    // Simulando dados mock
    const dadosMock: IProduct[] = [
      { id: "1", nome: "Hambúrguer Clássico", preco: 2500, estoque: 10 },
      { id: "2", nome: "Batata Média", preco: 1200, estoque: 15 },
    ];
    setProdutos(dadosMock);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Produtos</h2>
        <button
          onClick={() => navigate("/admin/products")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Novo Produto
        </button>
      </div>

      <table className="w-full border text-sm shadow-sm rounded overflow-hidden">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Nome</th>
            <th className="p-3">Preço (Kz)</th>
            <th className="p-3">Estoque</th>
            <th className="p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.nome}</td>
              <td className="p-3">KZ {p.preco}</td>
              <td className="p-3">{p.estoque}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => navigate(`/admin/products/${p.id}`)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ProductList };
