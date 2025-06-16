const About = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fundo de imagem suave */}
      <div className="absolute inset-0 bg-[url('/bg-food.png')] bg-cover bg-center opacity-10 blur-sm" />

      <div className="relative z-10 max-w-screen-lg mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-[#591e00] mb-6">Sobre Nós</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Bem-vindo ao <strong>BilaBila 🍔</strong> – um ecommerce feito para
          conectar você aos melhores sabores da sua cidade! Somos apaixonados
          por boa comida, por isso reunimos uma seleção de produtos de
          qualidade, feitos com carinho por chefs e cozinheiros locais.
        </p>

        <p className="text-gray-700 text-lg mt-4 leading-relaxed">
          Nosso objetivo é facilitar sua experiência de compra, garantindo
          agilidade, confiança e sabor em cada pedido. Estamos sempre
          trabalhando para melhorar nosso serviço e trazer ofertas especiais
          para você.
        </p>

        <p className="text-gray-700 text-lg mt-4 leading-relaxed">
          Obrigado por fazer parte dessa jornada com a gente. 🍽️
        </p>

        {/* Contatos */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-2xl font-semibold text-[#591e00] mb-4">
            📞 Contato
          </h3>
          <p className="text-gray-700 text-lg">
            📧 Email:{" "}
            <a
              href="mailto:suporte@bilabila.ao"
              className="text-[#ff5b00] underline"
            >
              suporte@bilabila.ao
            </a>
          </p>
          <p className="text-gray-700 text-lg">
            📱 WhatsApp:{" "}
            <a href="tel:+244999999999" className="text-[#ff5b00] underline">
              +244 999 999 999
            </a>
          </p>
          <p className="text-gray-700 text-lg">
            📍 Endereço: Rua do Hambúrguer, Nº 123, Luanda
          </p>
        </div>
      </div>
    </div>
  );
};

export { About };
