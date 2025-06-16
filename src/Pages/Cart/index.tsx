import { CartSummary } from "../../components/CardSummary";
import { CartCard } from "../../components/CartCard";

const Cart = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-[#591e00] mb-6">Seu Carrinho</h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <CartCard />
        </div>
        <div className="w-full lg:w-1/3">
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export { Cart };
