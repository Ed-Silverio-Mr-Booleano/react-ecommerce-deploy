import React from "react";

interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onDecrease}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50"
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="min-w-[32px] text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        +
      </button>
    </div>
  );
};