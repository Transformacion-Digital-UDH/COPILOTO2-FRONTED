// src/stores/authStore.js
import { create } from 'zustand';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { alertToast } from '@/utils/alertToast';

const roleRoutes = {
  estudiante: "/estudiante/designacion-asesor",
  asesor: "/asesor/solicitud-asesoria",
  programa: "/programa/dashboard",
  facultad: "/facultad/resolucion-asesor",
  vri: "/vri-turnitin/gestor-asesor",
  turnitin: "/vri-turnitin/segundo-filtro",
  admin: "/admin/dashboard",
};

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,

  handleLogin: async (email, password) => {
    try {
      set({ loading: true });

      if (!email.includes('@udh.edu.pe')) {
        alertToast('Ingresa con una cuenta institucional @udh.edu.pe', 'Error al iniciar sesión', 'error');
        return;
      }

      const res = await axios.post('/login', { email, password });
      const userData = res.data.data;

      set({ user: { ...userData, token: res.data.token } });

      const route = roleRoutes[userData.rol];
      if (route) {
        window.location.href = route;
        alertToast('', `Bienvenido ${userData.nombre}`, 'success');
      }
    } catch (error) {
      const description = error.response?.data?.error?.join(' ') || 'Error al iniciar sesión';
      alertToast(description, 'Error', 'error');
    } finally {
      set({ loading: false });
    }
  },

  googleLogin: async (response) => {
    try {
      set({ loading: true });

      const userDecoded = jwt_decode(response.credential);

      if (userDecoded.hd !== 'udh.edu.pe') {
        alertToast('Ingresa con una cuenta institucional @udh.edu.pe', 'Error al iniciar sesión', 'error');
        return;
      }

      const res = await axios.post('/api/login/google', {
        email: userDecoded.email,
      });

      const userData = res.data.data;

      set({
        user: {
          ...userData,
          token: res.data.token,
          fullName: userDecoded.name,
          image: userDecoded.picture,
        },
      });

      const route = roleRoutes[userData.rol];
      if (route) {
        window.location.href = route;
        alertToast('', `Bienvenido ${userDecoded.name}`, 'success');
      }
    } catch (error) {
      const description = error.response?.data?.error?.join(' ') || 'Error al iniciar sesión';
      alertToast(description, 'Error', 'error');
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null });
    window.location.href = '/';
  },
}));
