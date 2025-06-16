// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pass: string) => {
    return pass.length >= 6 && /\d/.test(pass);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!validatePassword(password)) {
      alert("A senha deve ter pelo menos 6 caracteres e conter números.");
      return;
    }

    try {
      await axios.post(
        "https://ecommer-api-bilabila-deploy-render.onrender.com/api/register",
        {
          email,
          password,
          username,
        }
      );
      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (err) {
      alert("Erro ao registrar. Verifique os dados preenchidos.");
    }
  };

  const senhaInvalida = password && !validatePassword(password);
  const senhaDiferente =
    password && confirmPassword && password !== confirmPassword;

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
        onSubmit={handleRegister}
        className="relative z-10 bg-white/80 backdrop-blur-md shadow-2xl p-8 rounded-xl w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>

        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full mb-4 p-3 border rounded-lg text-sm"
        />

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
          className="w-full mb-1 p-3 border rounded-lg text-sm"
        />
        {senhaInvalida && (
          <p className="text-red-500 text-xs mb-3">
            A senha deve ter pelo menos 6 caracteres e conter ao menos um
            número.
          </p>
        )}

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-1 p-3 border rounded-lg text-sm"
        />
        {senhaDiferente && (
          <p className="text-red-500 text-xs mb-4">As senhas não coincidem.</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition"
        >
          Registrar
        </button>

        <div className="mt-4 text-center text-sm">
          <span>Já tens conta?</span>
          <button
            type="button"
            className="ml-1 text-orange-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export { Register };
