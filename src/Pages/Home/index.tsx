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
    <>
      <div className="flex space-x-6">
        {/* Filtros */}
        <div className="w-[300px] min-h-[400px] rounded-md bg-white p-6 shadow">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Categoria
            </h3>
            <select
              className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              <option value={0}>Todas</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.categoria}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              isDeletable={false}
              onDelete={() => {}}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export { Home };
