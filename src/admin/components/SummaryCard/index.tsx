// src/components/SummaryCard.tsx
import { ReactNode, useEffect, useState } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaArrowUp } from "react-icons/fa";

interface SummaryCardProps {
  label: string;
  value: number;
  previous?: number; // valor anterior para comparar
  color?: string;
}

const iconMap: Record<string, ReactNode> = {
  Produtos: <FaBox className="text-green-600 text-2xl" />,
  Pedidos: <FaShoppingCart className="text-blue-600 text-2xl" />,
  Usuários: <FaUsers className="text-yellow-600 text-2xl" />,
};

export const SummaryCard = ({
  label,
  value,
  previous = 0,
  color = "bg-gray-100",
}: SummaryCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [value]);

  const diff = value - previous;
  const percentage = previous > 0 ? ((diff / previous) * 100).toFixed(1) : null;
  const isPositive = diff >= 0;

  return (
    <div
      className={`rounded-xl shadow-md p-6 flex items-center gap-4 ${color}`}
    >
      <div className="p-3 bg-white rounded-full shadow">
        {iconMap[label] || <FaBox className="text-gray-600 text-2xl" />}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-800">{displayValue}</p>
        {percentage && (
          <p
            className={`text-xs mt-1 flex items-center gap-1 ${
              isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            <FaArrowUp className={`${!isPositive && "rotate-180"}`} />
            {percentage}% {isPositive ? "de aumento" : "de queda"}
          </p>
        )}
      </div>
    </div>
  );
};
