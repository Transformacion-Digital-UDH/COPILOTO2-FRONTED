import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-azul shadow-md font-Roboto w-full border-t border-gray-200">
      <div className="max-w-screen-xl mx-auto p-4 md:py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Redes Sociales */}
        <div className="flex justify-center md:justify-start mb-4 md:mb-0 space-x-4">
          <a
            href="https://www.facebook.com"
            title="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-md text-gray-800 transition-all duration-300 hover:bg-[#1877f2] hover:text-white hover:-translate-y-1.5"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.twitter.com"
            title="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-md text-gray-800 transition-all duration-300 hover:bg-[#1da1f2] hover:text-white hover:-translate-y-1.5"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-md text-gray-800 transition-all duration-300 hover:bg-[#F58529] hover:text-white hover:-translate-y-1.5"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Enlaces */}
        <div className="text-center md:text-left">
          <ul className="flex flex-col md:flex-row text-sm font-medium text-white space-y-2 md:space-y-0 md:space-x-6">
            <li>
              <a href="#" className="hover:underline">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Política de Privacidad
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Licencias
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Derechos Reservados */}
      <div className="max-w-screen-xl mx-auto p-4 text-center border-t border-gray-200">
        <span className="block text-sm text-white">
          © 2024{" "}
          <a href="#" className="hover:underline">
            Mi Proyecto React ™
          </a>
          . Todos los Derechos Reservados.
        </span>
      </div>
    </footer>
  );
};

export default Footer;