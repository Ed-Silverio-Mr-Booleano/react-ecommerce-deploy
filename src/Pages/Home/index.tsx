import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard";
import { getCategories, getProducts } from "../../service/calls/products";
import type { ICategory, IProduct } from "../../@types";

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const initialData = async () => {
    const products = await getProducts();
    const categories = await getCategories();
    setProducts(products);
    setCategories(categories);
  };

  useEffect(() => {
    initialData();
  }, []);

  const filteredProducts =
    selectedCategory === 0
      ? products
      : products.filter((p) => p.categoria.id === selectedCategory);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      {/* Cabeçalho da Página */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#591e00] mb-2">Produtos</h2>
        <p className="text-gray-600">
          Veja todos os nossos produtos disponíveis!
        </p>
      </div>

      {/* Filtros + Produtos */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtro lateral */}
        <aside className="w-full lg:w-[280px] bg-white shadow rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Filtrar por Categoria
          </h3>
          <select
            className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
          >
            <option value={0}>Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoria}
              </option>
            ))}
          </select>
        </aside>

        {/* Lista de produtos */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              isDeletable={false}
              onDelete={() => {}}
              product={product}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export { Home };
