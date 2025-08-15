import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AppHeader = () => {
  const internalNavigation = [
    { name: "Inicio", href: "/" },
    { name: "Nosotros", href: "#" },
  ];

    // Enlaces externos
  const externalLinks = [
    { name: "Copilot", href: "https://copiloto.udh.edu.pe/" },
  ];

  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState("Inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const selectItem = (name) => {
    setSelected(name);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleInternalNavigation = (href, name) => {
    navigate(href);
    selectItem(name);
  };

  const handleExternalNavigation = (href, name) => {
    window.open(href, '_blank', 'noopener noreferrer');
    selectItem(name);
  };

  const goToLoginOrEstudiante = () => {
    if (token) {
      navigate("/estudiante");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md font-Roboto">
      <div className="max-w-full w-[1700px] px-2 sm:px-6 lg:px-8 flex justify-between items-center h-20 mx-auto">
        {/* Logo */}
        <a href="/" aria-label="Inicio">
          <img className="h-12" src="/img/logo_light.svg" alt="Logo" />
        </a>

        {/* Menu Desktop */}
        <div className="hidden sm:flex space-x-6">
          {internalNavigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleInternalNavigation(item.href, item.name)}
              className={`rounded-md px-4 py-3 text-lg font-light ${
                selected === item.name
                  ? "bg-base text-white"
                  : "text-custom-gray hover:bg-base hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}

          {externalLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleExternalNavigation(item.href, item.name)}
              className={`rounded-md px-4 py-3 text-lg font-light ${
                selected === item.name
                  ? "bg-base text-white"
                  : "text-custom-gray hover:bg-base hover:text-white"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Botón Login Desktop */}
        <button
          onClick={goToLoginOrEstudiante}
          className="bg-base text-white p-2 rounded-full min-w-[140px] hidden sm:block"
        >
          Iniciar Sesión
        </button>

        {/* Botón menú móvil */}
        <button
            onClick={goToLoginOrEstudiante}
            className="bg-base text-white p-2 rounded-full min-w-[140px] hidden sm:block"
        >
            {token ? "Panel Estudiante" : "Iniciar Sesión"}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {internalNavigation.map((item) => (
            <button
                key={item.name}
                onClick={() => handleInternalNavigation(item.href, item.name)}
                className={`block w-full text-left rounded-md px-4 py-3 text-lg font-light ${
                  selected === item.name
                    ? "bg-base text-white"
                    : "text-custom-gray hover:bg-base hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={goToLoginOrEstudiante}
              className="block w-full text-left rounded-md px-4 py-3 bg-base text-white"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppHeader;
