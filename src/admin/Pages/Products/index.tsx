import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

interface Categoria {
  id: number;
  categoria: string;
}

const Products = () => {
  const { id } = useParams();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [img, setImg] = useState("");
  const [categoriaId, setCategoriaId] = useState<number>(1);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://ecommer-api-bilabila-deploy-render.onrender.com/api/categorias"
    )
      .then((res) => res.json())
      .then(setCategorias);

    fetch(
      "https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos"
    )
      .then((res) => res.json())
      .then(setProdutos);
  }, []);

  useEffect(() => {
    if (id) {
      fetch(
        `https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos/${id}`
      )
        .then((res) => res.json())
        .then((produto) => {
          setNome(produto.nome);
          setPreco(produto.preco);
          setEstoque(produto.estoque);
          setImg(produto.img);
          setCategoriaId(produto.categoria.id);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoria = categorias.find((c) => c.id === categoriaId);
    if (!categoria) return alert("Categoria inválida.");

    const novoProduto = {
      nome: nome.trim(),
      preco,
      img: img.trim(),
      categoria,
      estoque,
    };

    try {
      const response = await fetch(
        id
          ? `https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos/${id}`
          : "https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos",
        {
          method: id ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoProduto),
        }
      );

      if (!response.ok) throw new Error("Erro ao salvar");

      alert("Produto salvo com sucesso!");
      window.location.reload();
    } catch {
      alert("Erro ao enviar produto.");
    }
  };

  const handleDelete = async (produtoId: number) => {
    if (!confirm("Remover este produto?")) return;
    await fetch(
      `https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos/${produtoId}`,
      {
        method: "DELETE",
      }
    );
    setProdutos((prev) => prev.filter((p) => p.id !== produtoId));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-[#591e00]">
        {id ? "Editar Produto" : "Cadastrar Produto"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/90 shadow-lg backdrop-blur-md border border-gray-200 p-8 rounded-2xl space-y-6 mb-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            placeholder="Preço (Kz)"
            value={preco}
            onChange={(e) => setPreco(Number(e.target.value))}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="number"
            placeholder="Estoque"
            value={estoque}
            onChange={(e) => setEstoque(Number(e.target.value))}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="text"
            placeholder="URL da imagem"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            className="col-span-1 md:col-span-2 p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(Number(e.target.value))}
            className="p-3 border rounded-lg"
            required
          >
            <option value="">Selecionar categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoria}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#ff5b00] hover:bg-[#e35300] text-white font-semibold py-3 rounded-xl transition"
        >
          {id ? "Salvar Alterações" : "Cadastrar Produto"}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4 text-[#591e00]">
        Produtos Cadastrados
      </h3>
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#FFF5EB] text-[#591e00]">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3">Estoque</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((prod) => (
              <tr
                key={prod.id}
                className="border-t hover:bg-[#fff9f4] transition"
              >
                <td className="px-4 py-2">{prod.id}</td>
                <td className="px-4 py-2">{prod.nome}</td>
                <td className="px-4 py-2">KZ {prod.preco}</td>
                <td className="px-4 py-2">{prod.estoque}</td>
                <td className="px-4 py-2">{prod.categoria?.categoria}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { Products };
