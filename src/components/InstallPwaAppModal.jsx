// src/components/InstallPwaAppModal.jsx
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { usePwaTimer } from '@/stores/pwaTimer';
import Modal from '@/components/Modal';
import AnimatedBorder from '@/components/AnimatedBorder';
import IconDownload from '@/components/icons/IconDownload';

export default function InstallPwaAppModal() {
  const { showInstallButton, installApp, setShowInstallButton } = usePwaInstall();
  const { postponeNow } = usePwaTimer();

  const closeModal = () => {
    setShowInstallButton(false);
    postponeNow();
  };

  const handleInstall = async () => {
    try {
      await installApp();
    } catch (error) {
      console.error('Error al instalar la app:', error);
    }
  };

  return (
    <Modal open={showInstallButton} onClose={closeModal}>
      <div className="text-center">
        {/* Encabezado */}
        <div className="mb-6">
          <div className="p-[2px] size-14 mx-auto mb-4 bg-gradient-to-tl from-amarillo to-base rounded-full flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-gray-900 dark:text-white">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h3 className="dark:text-white text-slate-900 text-2xl font-bold mb-2">¡Instala nuestra app!</h3>
          <p className="dark:text-gray-300 text-gray-600 text-base">Acceso rápido, funciona sin conexión y experiencia nativa</p>
        </div>

        {/* Imágenes */}
        <div className="relative flex justify-center mb-4 sm:mb-8 h-auto img-drop">
          <div className="relative">
            <img src="/img/mockup_copiloto_screenapp.png" alt="Instalada" className="h-52 2xl:h-72 transform -rotate-2 hover:rotate-0 transition-transform duration-300" />
          </div>
          <div className="relative -ml-10 sm:-ml-14">
            <img src="/img/mockup_copiloto_isometric.png" alt="Vista móvil" className="h-52 2xl:h-80 transform rotate-3 hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>

        {/* Beneficios */}
        <div className="grid grid-cols-2 gap-4 mb-0 text-sm">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-baseClarito dark:bg-base/30 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white dark:text-base" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="dark:text-gray-300 text-gray-600">Rápida</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 bg-amarillo/20 dark:bg-amarillo/30 text-[#d0c456] rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="dark:text-gray-300 text-gray-600">Nativa</span>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex flex-row justify-center items-center w-full gap-1 sm:gap-3 px-4 pb-4 mt-2">
        <button
          onClick={closeModal}
          className="w-full sm:w-auto px-2 py-3 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-400/30 hover:bg-gray-200 dark:hover:bg-gray-600/50 rounded-lg transition-colors duration-200 font-medium"
        >
          Más tarde
        </button>
        <AnimatedBorder className="w-full sm:w-auto min-w-[180px]">
          <button
            onClick={handleInstall}
            className="w-full h-10 font-semibold text-lg dark:text-white text-gray-900 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <span className="flex items-center justify-center gap-2">
              <IconDownload className="size-5" />
              Instalar
            </span>
          </button>
        </AnimatedBorder>
      </div>
    </Modal>
  );
}
