import { useEffect, useState } from "react";
import { getProducts } from "../../service/calls/products";
import { ProductCard } from "../../components/ProductCard";
import type { IProduct } from "../../@types";

const Promotions = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allProducts = await getProducts();
      // Apenas produtos com desconto de 20%
      const discounted = allProducts.filter((p) => p.promocao === true);
      setProducts(discounted);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-[#591e00] mb-8">
        Produtos em Promoção 🛍️
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const precoDesconto = (product.preco * 0.8).toFixed(2);
          return (
            <div key={product.id}>
              <ProductCard
                product={{ ...product, preco: Number(precoDesconto) }}
                isDeletable={false}
                onDelete={() => {}}
              />
              <p className="text-xs text-center mt-1 text-[#E63946]">
                De: KZ {product.preco.toFixed(2)} <br />
                <strong>Por: KZ {precoDesconto}</strong>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Promotions };
