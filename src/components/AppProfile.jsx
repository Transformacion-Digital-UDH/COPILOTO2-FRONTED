import React, { useState, useEffect, useRef } from 'react';
import { User, Settings } from 'lucide-react';

// Mock components - replace with your actual implementations
const UploadProfile = ({ url, urlRequest, faRole, pathSignature }) => (
  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
    <div className="space-y-4">
      <div className="text-gray-500 dark:text-gray-400">
        <Settings className="mx-auto h-12 w-12" />
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {faRole ? `Upload ${faRole} signature` : 'Upload signature'}
        </p>
      </div>
    </div>
  </div>
);

// Mock auth store - replace with your actual auth implementation
const useAuthStore = () => ({
  id: '1',
  email: 'user@example.com',
  token: 'mock-token',
  role: 'estudiante',
  phone: '',
  siglas: '',
  rango: ''
});

// Mock axios - replace with your actual API calls
const mockAxios = {
  get: async (url) => {
    // Mock API responses based on URL
    if (url.includes('/api/grades')) {
      return {
        data: {
          'Dr.': 'DOCTOR',
          'Mg.': 'MAGISTER',
          'Lic.': 'LICENCIADO',
          'Ing.': 'INGENIERO'
        }
      };
    }
    
    if (url.includes('/api/me/')) {
      return {
        data: {
          success: true,
          role: 'estudiante',
          profile: {
            stu_name: 'JUAN CARLOS',
            stu_lastname_m: 'PEREZ',
            stu_lastname_f: 'GARCIA',
            stu_dni: '12345678',
            stu_code: '2021001',
            stu_faculty: 'FACULTAD DE INGENIERÍA',
            stu_program: 'INGENIERÍA DE SISTEMAS',
            stu_telephone: '987654321',
            stu_sede: 'HUÁNUCO'
          }
        }
      };
    }
    
    return { data: {} };
  },
  put: async (url, data) => {
    return {
      data: {
        success: true,
        profile: data
      }
    };
  }
};

// Mock Swal - replace with your actual SweetAlert2 implementation
const mockSwal = {
  fire: async (options) => {
    if (options.showCancelButton) {
      return { isConfirmed: confirm(options.text || options.title) };
    } else {
      alert(options.text || options.title);
      return { isConfirmed: true };
    }
  }
};

const AppProfile = () => {
  const authStore = useAuthStore();
  const [load, setLoad] = useState(false);
  const [sedeLocked, setSedeLocked] = useState(false);
  const [currentTab, setCurrentTab] = useState('profile');
  const [userRole, setUserRole] = useState('');
  const [gradosAcademicos, setGradosAcademicos] = useState({});
  
  const [form, setForm] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    codigo: '',
    dni: '',
    facultad: '',
    programa: '',
    rango: '',
    orcid: '',
    es_jurado: '',
    rol: '',
    firma: '',
    cel: '',
    siglas: '',
    sede: ''
  });

  const sedes = ['HUÁNUCO', 'LEONCIO PRADO'];

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: User },
    ...(userRole === 'asesor' || userRole === 'programa' || userRole === 'facultad' 
      ? [{ id: 'signature', name: 'Firma Escaneada', icon: Settings }] 
      : [])
  ];

  // Validation functions
  const validateName = (value) => {
    return value
      .replace(/[^A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 50);
  };

  const validatePhone = (value) => {
    return value
      .replace(/[^0-9]/g, '')
      .slice(0, 9);
  };

  const validateSiglas = (value) => {
    return value
      .replace(/[^A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 8);
  };

  const formatORCID = (value) => {
    let rawValue = value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    rawValue = rawValue.slice(0, 16);
    
    let formatted = '';
    for (let i = 0; i < rawValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += '-';
      }
      formatted += rawValue[i];
    }
    return formatted;
  };

  const isCelularValid = () => {
    return /^[0-9]{9}$/.test(form.cel);
  };

  const isOrcidValid = () => {
    const ORCID_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return ORCID_REGEX.test(form.orcid);
  };

  // Handle input changes
  const handleInputChange = (field, value, validator) => {
    const processedValue = validator ? validator(value) : value;
    setForm(prev => ({ ...prev, [field]: processedValue }));
  };

  // API calls
  const selectGrades = async () => {
    try {
      const response = await mockAxios.get("/api/grades");
      setGradosAcademicos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    setLoad(true);
    const profile_id = authStore.id;
    
    try {
      const response = await mockAxios.get(`/api/me/${profile_id}`);
      if (response.data.success) {
        const data = response.data.profile;
        const role = response.data.role;
        setUserRole(role);
        
        if (
          (role === 'estudiante' && data.stu_sede) ||
          (role === 'asesor' && data.adv_sede) ||
          (role === 'programa' && data.pa_sede)
        ) {
          setSedeLocked(true);
        }

        switch (role) {
          case "estudiante":
            setForm(prev => ({
              ...prev,
              nombres: data.stu_name,
              apellido_paterno: data.stu_lastname_m,
              apellido_materno: data.stu_lastname_f,
              dni: data.stu_dni,
              codigo: data.stu_code,
              facultad: data.stu_faculty,
              programa: data.stu_program,
              cel: data.stu_telephone,
              sede: data.stu_sede,
              rol: role
            }));
            break;

          case "asesor":
            setForm(prev => ({
              ...prev,
              nombres: data.adv_name,
              apellido_paterno: data.adv_lastname_m,
              apellido_materno: data.adv_lastname_f,
              dni: data.adv_dni,
              rango: data.adv_rank,
              orcid: data.adv_orcid,
              facultad: data.adv_faculty,
              programa: data.adv_programs,
              es_jurado: data.adv_is_jury,
              firma: data.adv_signature,
              cel: data.adv_telephone,
              sede: data.adv_sede,
              rol: role
            }));
            break;

          case "facultad":
            setForm(prev => ({
              ...prev,
              nombres: data.fa_name,
              apellido_paterno: data.fa_lastname_m,
              apellido_materno: data.fa_lastname_f,
              facultad: data.fa_faculty,
              rango: data.fa_rank,
              siglas: data.fa_siglas,
              rol: role
            }));
            break;

          case "programa":
            setForm(prev => ({
              ...prev,
              nombres: data.pa_name,
              apellido_paterno: data.pa_lastname_m,
              apellido_materno: data.pa_lastname_f,
              facultad: data.pa_faculty,
              programa: data.pa_program,
              rango: data.pa_rank,
              siglas: data.pa_siglas,
              sede: data.pa_sede,
              rol: role
            }));
            break;

          default:
            console.warn("Rol desconocido", role);
            break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Validations
    if ((userRole === 'estudiante' || userRole === 'asesor') && form.cel.length > 0 && !isCelularValid()) {
      mockSwal.fire({
        text: 'Número de celular inválido',
        icon: 'error'
      });
      return;
    }

    if (userRole === 'asesor' && form.orcid.length > 0 && !isOrcidValid()) {
      mockSwal.fire({
        text: 'Orcid inválido',
        icon: 'error'
      });
      return;
    }

    if ((userRole === 'programa' || userRole === 'facultad') && (!form.rango || form.rango.trim() === '')) {
      mockSwal.fire({
        text: 'Debes seleccionar un grado académico',
        icon: 'error'
      });
      return;
    }

    if (userRole === 'estudiante' && (!form.sede || form.sede.trim() === '')) {
      mockSwal.fire({
        text: 'Debes seleccionar la sede',
        icon: 'error'
      });
      return;
    }

    try {
      const result = await mockSwal.fire({
        title: 'Actualizacion de datos',
        text: '¿Declara bajo juramento que toda la información ingresada en el sistema es veraz y correcta?',
        showCancelButton: true
      });

      if (result.isConfirmed) {
        setLoad(true);
        const profile_id = authStore.id;
        const response = await mockAxios.put(`/api/me/actualizar/${profile_id}`, form);
        
        if (response.data.success) {
          mockSwal.fire({
            title: '¡Perfil actualizado!',
            text: 'Se han guardado tus datos correctamente',
            icon: 'success'
          });
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const changeTab = (tabId) => {
    setCurrentTab(tabId);
    window.location.hash = `tab=${tabId}`;
  };

  useEffect(() => {
    getUserData();
    selectGrades();
    
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    setCurrentTab(params.get('tab') || 'profile');
  }, []);

  if (load && !form.nombres) {
    return (
      <div className="min-h-full bg-gray-100 dark:bg-gray-900 p-4 items-center content-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col sm:flex-row h-[600px]">
            <div className="sm:w-64 border-b sm:border-b-0 sm:border-r border-gray-200 dark:border-gray-700">
              <nav className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-2 p-4">
                <div className="animate-pulse space-y-4">
                  <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  <div className="w-full h-12 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px] max-h-[800px]">
          {/* Tabs Verticales */}
          <div className="lg:w-64 bg-gray-50 dark:bg-gray-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-4 space-x-2 lg:space-x-0 lg:space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => changeTab(tab.id)}
                  className={`${
                    currentTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md'
                  } w-full lg:w-auto text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-all duration-200 ease-in-out whitespace-nowrap`}
                >
                  <tab.icon className={`h-5 w-5 flex-shrink-0 ${currentTab === tab.id ? 'text-white' : 'text-emerald-500'}`} />
                  <span className="hidden lg:block text-sm font-semibold tracking-wide">
                    {tab.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Contenido */}
          <div className="flex-1 bg-white dark:bg-gray-800">
            <div className="h-full p-6 lg:p-8 overflow-y-auto custom-scrollbar">
            {/* Tab de Firma */}
            {currentTab === 'signature' && userRole !== 'estudiante' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="mt-2">
                        {userRole === 'asesor' && (
                          <UploadProfile
                            url={form.firma}
                            urlRequest={`/api/adviser/update/${authStore.id}/signature?_method=PUT`}
                          />
                        )}

                        {userRole === 'programa' && (
                          <UploadProfile
                            url={form.firma}
                            urlRequest={`/api/program/signature/${authStore.id}/update?_method=PUT`}
                          />
                        )}

                        {userRole === 'facultad' && (
                          <div className="flex flex-col items-center space-y-10">
                            <UploadProfile
                              url={form.firma}
                              urlRequest={`/api/faculty/signature/${authStore.id}/update?_method=PUT`}
                              faRole="decano"
                              pathSignature={`signatures/decano${authStore.id}.png`}
                            />
                            <UploadProfile
                              url={form.firma}
                              urlRequest={`/api/faculty/signature/${authStore.id}/update?_method=PUT`}
                              faRole="secretario"
                              pathSignature={`signatures/secretario${authStore.id}.png`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab de Perfil */}
            {currentTab === 'profile' && (
              <div className="max-w-3xl">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 tracking-wide">
                    
                    {/* CAMPO PARA LOS NOMBRES */}
                    <div>
                      <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                        Nombres
                        {userRole !== 'estudiante' && userRole !== 'asesor' && (
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        )}
                      </label>
                      {userRole !== 'programa' && userRole !== 'facultad' ? (
                        <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {form.nombres}
                        </p>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={form.nombres}
                            onChange={(e) => handleInputChange('nombres', e.target.value, validateName)}
                            maxLength="50"
                            required
                            className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                            Puedes modificar este campo
                          </p>
                        </>
                      )}
                    </div>

                    {/* CAMPO PARA LOS APELLIDOS PATERNOS */}
                    <div>
                      <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                        Apellido paterno
                        {userRole !== 'estudiante' && userRole !== 'asesor' && (
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        )}
                      </label>
                      {userRole !== 'programa' && userRole !== 'facultad' ? (
                        <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {form.apellido_paterno}
                        </p>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={form.apellido_paterno}
                            onChange={(e) => handleInputChange('apellido_paterno', e.target.value, validateName)}
                            maxLength="50"
                            required
                            className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                            Puedes modificar este campo
                          </p>
                        </>
                      )}
                    </div>

                    {/* CAMPO PARA LOS APELLIDOS MATERNOS */}
                    <div>
                      <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                        Apellido materno
                        {userRole !== 'estudiante' && userRole !== 'asesor' && (
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        )}
                      </label>
                      {userRole !== 'programa' && userRole !== 'facultad' ? (
                        <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {form.apellido_materno}
                        </p>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={form.apellido_materno}
                            onChange={(e) => handleInputChange('apellido_materno', e.target.value, validateName)}
                            maxLength="50"
                            required
                            className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                            Puedes modificar este campo
                          </p>
                        </>
                      )}
                    </div>

                    {/* CAMPO PARA EL DNI */}
                    {userRole !== 'facultad' && userRole !== 'programa' && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          DNI
                        </label>
                        <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {form.dni}
                        </p>
                      </div>
                    )}

                    {/* CAMPO PARA LA FACULTAD */}
                    <div>
                      <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                        Facultad
                      </label>
                      <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                        {form.facultad}
                      </p>
                    </div>

                    {/* CAMPO PARA EL PROGRAMA ACADEMICO */}
                    {userRole !== 'facultad' && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Programa académico
                        </label>
                        <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {userRole === 'asesor' && Array.isArray(form.programa)
                            ? [...new Set(form.programa.map(p => p.adv_program))].join(', ')
                            : form.programa}
                        </p>
                      </div>
                    )}

                    {/* CAMPO PARA EL CODIGO */}
                    {userRole === 'estudiante' && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Código
                        </label>
                        <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {form.codigo}
                        </p>
                      </div>
                    )}

                    {/* CAMPO PARA EL GRADO ACADEMICO */}
                    {(userRole === 'programa' || userRole === 'facultad' || userRole === 'asesor') && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Grado académico
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        </label>
                        <select
                          value={form.rango}
                          onChange={(e) => setForm(prev => ({ ...prev, rango: e.target.value }))}
                          required
                          className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                        >
                          <option value="" disabled>Selecciona el grado</option>
                          {Object.entries(gradosAcademicos).map(([abreviatura, grado]) => (
                            <option key={abreviatura} value={grado.toUpperCase()}>
                              {abreviatura} ({grado})
                            </option>
                          ))}
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                          Puedes modificar este campo
                        </p>
                      </div>
                    )}

                    {/* CAMPO PARA EL CORREO INSTITUCIONAL */}
                    {userRole !== 'programa' && userRole !== 'facultad' && userRole !== 'asesor' && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Correo institucional
                        </label>
                        <p className="break-words mt-1 block w-full px-4 py-[9px] bg-slate-100 focus:bg-slate-100 dark:focus:bg-gray-700 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                          {authStore.email}
                        </p>
                      </div>
                    )}

                    {/* CAMPO PARA LA SEDE */}
                    {userRole !== 'facultad' && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Sede
                          {userRole === 'estudiante' && !form.sede && (
                            <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                          )}
                        </label>

                        {userRole === 'estudiante' ? (
                          !sedeLocked ? (
                            <>
                              <select
                                value={form.sede}
                                onChange={(e) => setForm(prev => ({ ...prev, sede: e.target.value }))}
                                required
                                className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                              >
                                <option value="" disabled>Seleccione la sede</option>
                                {sedes.map((sede) => (
                                  <option key={sede} value={sede}>{sede}</option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                                Puedes modificar este campo una sola vez
                              </p>
                            </>
                          ) : (
                            <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                              {form.sede}
                            </p>
                          )
                        ) : (
                          <p className="mt-1 block w-full px-4 py-[9px] bg-slate-100 dark:bg-gray-900 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-900 shadow-sm cursor-not-allowed">
                            {userRole === 'asesor' && Array.isArray(form.programa)
                              ? [...new Set(form.programa.map(p => p.adv_sede))].join(', ')
                              : form.sede}
                          </p>
                        )}
                      </div>
                    )}

                    {/* CAMPO PARA EL NUMERO CELULAR */}
                    {(userRole === 'estudiante' || userRole === 'asesor') && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Número celular
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        </label>
                        <input
                          type="text"
                          value={form.cel}
                          onChange={(e) => handleInputChange('cel', e.target.value, validatePhone)}
                          maxLength="9"
                          required
                          className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                          Puedes modificar este campo
                        </p>
                      </div>
                    )}

                    {/* CAMPO PARA EL ORCID */}
                    {userRole === 'asesor' && (
                      <div>
                        <label className="block tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium uppercase">
                          ORCID
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        </label>
                        <input
                          type="text"
                          value={form.orcid}
                          onChange={(e) => handleInputChange('orcid', e.target.value, formatORCID)}
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          required
                          className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                          Puedes modificar este campo
                        </p>
                        {!isOrcidValid() && form.orcid.length > 0 && (
                          <p className="text-red-500 text-xs mt-1 px-3">
                            El formato del ORCID no es válido.
                          </p>
                        )}
                      </div>
                    )}

                    {/* CAMPO PARA LAS SIGLAS */}
                    {(userRole === 'programa' || userRole === 'facultad') && (
                      <div>
                        <label className="block capitalize tracking-wide text-blue-600 dark:text-gray-400 text-sm font-medium">
                          Siglas
                          <strong className="text-red-500/80 dark:text-red-400 text-lg">*</strong>
                        </label>
                        <input
                          type="text"
                          value={form.siglas}
                          onChange={(e) => handleInputChange('siglas', e.target.value, validateSiglas)}
                          maxLength="8"
                          required
                          className="uppercase mt-1 block w-full bg-white focus:bg-slate-100 dark:focus:bg-gray-900 dark:bg-gray-700 rounded-md text-gray-600 dark:text-slate-300 border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-gray-600 dark:focus:ring-gray-800"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 px-3">
                          Puedes modificar este campo
                        </p>
                      </div>
                    )}

                    {/* Guía para indicar que es importante su número de celular para el envío de correos */}
                    {(userRole === 'estudiante' || userRole === 'asesor') && (
                      <div className="animate-bounce">
                        <div className="p-2 border border-red-500 dark:border-red-400 rounded-3xl">
                          <p className="text-[16px] text-red-700 dark:text-red-400 italic">
                            <strong>¡Importante!</strong> Mantén tu número celular actualizado para recibir notificaciones.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <button
                      disabled={load}
                      type="submit"
                      className="inline-flex justify-center items-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 ease-in-out"
                    >
                      {load && (
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                      )}
                      <span>{load ? 'Guardando...' : 'Guardar Cambios'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppProfile;
