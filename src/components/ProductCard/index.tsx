import { MdOutlineDeleteOutline } from "react-icons/md";
import type { IProduct } from "../../@types";
import Fast from "../../assets/fast.png";
import { FaCartArrowDown } from "react-icons/fa";
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
  return (
    <>
      <div
        onClick={() => addProduct(product)}
        className={`"w-full bg-white  relative  cursor-pointer px-4 py-6 rounded-md " ${
          isSelected
            ? "border-2 productAnimation border-c-gray-100"
            : "border border-[#CFD8DC]"
        }`}
      >
        <button
          onClick={onDelete}
          className="bg-white shadow-md w-7 h-7 rounded-full absolute right-2 z-50 top-4 flex justify-center items-center"
        >
          <FaCartArrowDown />
        </button>
        <div className=" gap-4 relative">
          <div className=" p-2 rounded-md flex justify-center min-h-32 h-auto  items-center bg-c-gray-600 relative bg-[#E4F6F7]">
            <img className="w-20" src={product.img} />
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">{product.nome}</p>
            <p className="font-light  text-[11px] mt-2 text-justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing consectetur
              adipisicing
            </p>
            <div className="grid grid-cols-3 mt-[18px]">
              <div className="border-r-[1px]">
                <p className="text-center text-xs text-[#9C9898]">Preço</p>
                <p className="text-sm text-center mt-1">KZ {product.preco}</p>
              </div>

              <div>
                <p className="text-center text-xs text-[#9C9898]">Stock</p>
                <p className="text-sm text-center mt-1">{product.estoque}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { ProductCard };
