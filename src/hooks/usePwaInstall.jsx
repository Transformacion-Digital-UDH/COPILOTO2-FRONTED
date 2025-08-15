// src/hooks/usePwaInstall.jsx
import { useEffect, useState } from 'react';
import { usePwaTimer } from '@/stores/pwaTimer'; // aún por crear

let deferredPrompt = null;

export function usePwaInstall() {
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { canShowAgain } = usePwaTimer(); // lógica de repetición opcional

  const isInstalled =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  useEffect(() => {
    if (isInstalled || !canShowAgain) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [canShowAgain, isInstalled]);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      // console.log('Instalación aceptada');
    } else {
      // console.log('Instalación cancelada');
    }

    deferredPrompt = null;
    setShowInstallButton(false);
  };

  const changeValueShow = () => {
    setShowInstallButton((prev) => !prev);
  };

  return {
    showInstallButton,
    setShowInstallButton,
    installApp,
    changeValueShow,
  };
}
