// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://ecommer-api-bilabila-deploy-render.onrender.com/api/login",
        {
          email,
          password,
          username: email.split("@")[0],
        }
      );

      login(res.data);
      toast.success("Login realizado com sucesso!");

      if (res.data.tipo === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/fotos-premium/um-hamburguer-delicioso-com-carne-queijo-tomates-e-alface_1224819-2123.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 backdrop-blur-md shadow-2xl p-8 rounded-xl w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-lg text-sm"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 p-3 border rounded-lg text-sm"
        />
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl transition"
        >
          Entrar
        </button>
        <div className="mt-6 text-center text-sm text-gray-700">
          Não tens conta?
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="ml-2 inline-flex items-center gap-1 text-orange-600 hover:underline transition"
          >
            <FaUserPlus size={14} />
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
};

export { Login };
