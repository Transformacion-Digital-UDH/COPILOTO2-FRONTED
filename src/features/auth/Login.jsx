import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/hooks/useAuth';
import ButtonFloatTheme from '@/components/ButtonFloatTheme';
import ButtonFloatPwa from '@/components/ButtonFloatPwa';
import './Auth.css'; 

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { googleLogin } = useAuth();

  const onGoogleLoginSuccess = async (response) => {
    setIsLoading(true);
    try {
      await googleLogin(response);
    } catch (error) {
      console.error('❌ Error al iniciar sesión con Google:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
        <img
            src="/img/logo_dark.svg"
            alt="Logo oscuro"
            className="logo-img dark-mode"
            />
            <img
                src="/img/logo_light.svg"
                alt="Logo claro"
                className="logo-img light-mode"
            />
    <div className="image-container">
        <img src="/img/UDH.webp" alt="Campus" />
      </div>
      <div className="form-container">
        <div className="login-card">
          <h2 className="login-title">Iniciar sesión</h2>

          <p className="register-text-login">¿Aún no tienes una cuenta?</p>
          <a href="/register" className="register-button-login">REGÍSTRATE AQUÍ</a>

          <p className="subtitle-login">
            Tu correo debe terminar en <strong>@udh.edu.pe</strong>
         </p>

          <div style={{ position: 'relative', display: 'inline-block', height: '10px' }}>
            <div
              id="google-signin-button"
              style={{
                opacity: isLoading ? 0.5 : 1,
                pointerEvents: isLoading ? 'none' : 'auto',
                height: '100%',
              }}
            >
              <GoogleLogin
                onSuccess={onGoogleLoginSuccess}
                onError={() => console.log('❌ Login Failed')}
                useOneTap
              />
            </div>
            {isLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="spinner-login"></div>
              </div>
            )}
          </div>

          <div className="login2-help" style={{ marginTop: '30px' }}>
            <a
              href="https://drive.google.com/file/d/1CpKYvq-dq0FhdASeGBHLQY_SfEjGOGgm/view"
              target="_blank"
              rel="noreferrer"
            >
              ¿Necesitas ayuda? Mira esta guía.
            </a>
          </div>
        </div>
      </div>
      <ButtonFloatTheme />
    <ButtonFloatPwa />
    </div>
  );
}
