import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import type { IProduct } from "../../@types";
import { useCartStore } from "../../stores/cartStore";

interface IProductCardProps {
  product: IProduct;
  onDelete(): void;
  isDeletable: boolean;
  isSelected?: boolean;
}

const ProductCard = ({
  product,
  onDelete,
  isDeletable = false,
  isSelected = false,
}: IProductCardProps) => {
  const { addProduct } = useCartStore();

  const temDesconto = product.desconto;
  const precoComDesconto = temDesconto ? product.preco * 0.8 : product.preco;

  return (
    <div
      className={`w-full bg-[#FFFBF7] relative px-4 py-6 rounded-xl shadow-md transition-all hover:shadow-lg ${
        isSelected
          ? "border-2 border-[#FFA500] scale-[1.02]"
          : "border border-gray-200"
      }`}
    >
      {/* Selo de Desconto */}
      {temDesconto && (
        <div className="absolute top-2 left-2 bg-[#ff5b00] text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
          -20%
        </div>
      )}

      {/* Botão Carrinho */}
      <button
        onClick={() => addProduct(product)}
        className="bg-[#FFE8CC] hover:bg-[#FFD8A8] shadow-md w-8 h-8 rounded-full absolute right-2 top-4 flex justify-center items-center z-10 transition"
        title="Adicionar ao carrinho"
      >
        <FaCartArrowDown className="text-[#D9480F]" />
      </button>

      {/* Botão Deletar */}
      {isDeletable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute left-2 top-4 w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex justify-center items-center shadow-sm z-10"
          title="Remover produto"
        >
          <MdOutlineDeleteOutline className="text-red-600" />
        </button>
      )}

      <div className="flex justify-center items-center h-32 bg-white rounded-lg overflow-hidden mb-4">
        <img
          src={product.img}
          alt={product.nome}
          className="h-24 scale-125 object-contain transition-transform duration-300 hover:scale-150"
        />
      </div>

      <p className="text-base font-bold text-gray-800 text-center">
        {product.nome}
      </p>
      <p className="text-sm mt-2 text-justify px-1 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>

      <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-gray-500 border-t pt-2">
        <div className="text-center">
          <p className="text-[11px]">Preço</p>
          {temDesconto ? (
            <div>
              <p className="text-xs text-gray-400 line-through">
                KZ {product.preco.toFixed(2)}
              </p>
              <p className="text-sm font-semibold text-[#E63946]">
                KZ {precoComDesconto.toFixed(2)}
              </p>
            </div>
          ) : (
            <p className="text-sm font-semibold text-[#E63946]">
              KZ {product.preco.toFixed(2)}
            </p>
          )}
        </div>
        <div className="text-center">
          <p className="text-[11px]">Stock</p>
          <p className="text-sm font-semibold text-[#E63946]">
            {product.estoque}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ProductCard };
