// src/components/Footer.tsx
import Logo from "../../assets/BilaBila-Logo-Laranja.svg";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2d1400] text-white pt-8 pb-6">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-12 h-12" />
          <span className="text-lg font-semibold">BilaBila</span>
        </div>

        {/* Redes Sociais */}
        <div className="flex items-center gap-4 text-lg">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-[#ff5b00] transition"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-[#ff5b00] transition"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://wa.me/244999999999"
            target="_blank"
            className="hover:text-[#ff5b00] transition"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-6 text-xs">
        © {new Date().getFullYear()} BilaBila. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export { Footer };
