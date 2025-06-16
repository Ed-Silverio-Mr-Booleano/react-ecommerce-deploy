// src/admin/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { SummaryCard } from "../../components/SummaryCard";
import axios from "axios";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    produtos: 0,
    pedidos: 0,
    usuarios: 0,
  });

  const [previousStats, setPreviousStats] = useState({
    produtos: 42,
    pedidos: 110,
    usuarios: 8,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes, userRes] = await Promise.all([
          axios.get(
            "https://ecommer-api-bilabila-deploy-render.onrender.com/api/produtos"
          ),
          axios.get(
            "https://ecommer-api-bilabila-deploy-render.onrender.com/api/vendas"
          ),
          axios.get(
            "https://ecommer-api-bilabila-deploy-render.onrender.com/api/users/by-role?role=USER"
          ),
        ]);

        setStats({
          produtos: prodRes.data.length,
          pedidos: orderRes.data.length,
          usuarios: userRes.data.length,
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SummaryCard
        label="Produtos"
        value={stats.produtos}
        previous={previousStats.produtos}
        color="bg-green-100"
      />
      <SummaryCard
        label="Pedidos"
        value={stats.pedidos}
        previous={previousStats.pedidos}
        color="bg-blue-100"
      />
      <SummaryCard
        label="Usuários"
        value={stats.usuarios}
        previous={previousStats.usuarios}
        color="bg-yellow-100"
      />
    </div>
  );
};
