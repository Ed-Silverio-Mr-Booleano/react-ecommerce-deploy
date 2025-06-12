import { CartSummary } from "../../components/CardSummary";
import { CartCard } from "../../components/CartCard";

const Cart = () => {
  return (
    <>
      <div className="flex space-x-4">
        <div className="w-[70%]">
          <CartCard />
        </div>
        <div className="w-[30%]">
          <CartSummary />
        </div>
      </div>
    </>
  );
};

export { Cart };
