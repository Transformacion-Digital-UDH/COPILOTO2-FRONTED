import { useState } from 'react';
import ButtonFloatTheme from '@/components/ButtonFloatTheme';
import ButtonFloatPwa from '@/components/ButtonFloatPwa';
import IconEyePassword from '@/components/icons/IconEyePassword';
import IconEyeIsPassword from '@/components/icons/IconEyeIsPassword';
import './Auth.css'; 


export default function Register() {
  const [showDni, setShowDni] = useState(false);

  return (
    <div className="login-page">

      <img src="/img/logo_dark.svg" alt="Logo oscuro" className="logo-img dark-mode" />
      <img src="/img/logo_light.svg" alt="Logo claro" className="logo-img light-mode" />

      <div className="image-container">
        <img src="/img/UDH.webp" alt="Campus" />
      </div>

      <div className="form-container">
        <div className="register-card">
          <h2 className="register-title">Registrate</h2>

          <p className="register-text-registro">
            ¿Ya tienes una cuenta?{' '}
            <a className="inline-link" href="/login">Inicia sesión aquí</a>
          </p>

          <label className="field-label-registro" htmlFor="codigo">Código (10 dígitos)</label>
          <div className="input-group">
            <input
              id="codigo"
              type="text"
              placeholder="Código institucional"
              className="input-base-registro input-with-suffix"
              maxLength={10}
              inputMode="numeric"
            />
            <span className="input-suffix">@udh.edu.pe</span>
          </div>
          <label className="field-label-registro" htmlFor="dni">DNI</label>
          <div className="input-group">
            <input
              id="dni"
              type={showDni ? 'text' : 'password'}
              placeholder="Ingrese número DNI"
              className="input-base-registro input-with-icon"
              maxLength={12}
              inputMode="numeric"
            />
            <button
                type="button"
                className="icon-button"
                aria-label={showDni ? 'Ocultar DNI' : 'Mostrar DNI'}
                onClick={() => setShowDni(v => !v)}
                >
                {showDni ? (
                    <IconEyeIsPassword size={20} />
                ) : (
                    <IconEyePassword size={20} />
                )}
                </button>
          </div>
          <label className="checkbox-row">
            <input type="checkbox" />
            <span>
              Acepto las <a href="#" className="link-terms">condiciones del servicio</a> y las{' '}
              <a href="#" className="link-terms">políticas de privacidad</a>
            </span>
          </label>

          <button className="register-submit" type="button">
            REGISTRAR
          </button>
        </div>
      </div>

      <ButtonFloatTheme />
      <ButtonFloatPwa />
    </div>
  );
}
