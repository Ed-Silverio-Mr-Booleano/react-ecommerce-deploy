import { useEffect, useState } from "react";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://ecommer-api-bilabila-deploy-render.onrender.com/api/users/by-role?role=USER"
      )
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold text-[#591e00] mb-6">
        Clientes Cadastrados
      </h2>

      <div className="overflow-x-auto shadow-md rounded-xl border border-gray-200">
        <table className="min-w-full text-sm bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-[#FFF5EC] text-[#591e00] text-left">
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Nome de Usuário</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Tipo</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhum usuário encontrado.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-[#FFF9F3] transition"
                >
                  <td className="px-5 py-3">{user.id}</td>
                  <td className="px-5 py-3 font-medium text-[#3a3a3a]">
                    {user.username}
                  </td>
                  <td className="px-5 py-3 text-gray-700">{user.email}</td>
                  <td className="px-5 py-3 text-green-700 font-semibold">
                    {user.tipo || "cliente"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
