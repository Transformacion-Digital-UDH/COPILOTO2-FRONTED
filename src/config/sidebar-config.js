import { 
  FileText, 
  Play, 
  ClipboardList, 
  Presentation, 
  XCircle, 
  Bot, 
  Users, 
  Settings
} from 'lucide-react';

export const sidebarConfig = {
  tesista: [
   // {
     // name: 'ProyectoDeTesis',
      //label: 'Plan de Tesis',
      //icon: FileText,
     // submenus: [
       // { name: 'Designacion de asesor', label: 'Designación de asesor', path: '/tesista/solicitar-asesor' },
        // { name: 'Conformidad por el asesor', label: 'Conformidad por el asesor', path: '/tesista/conformidad-asesor' },
        // { name: 'Designacion de jurados', label: 'Designación de jurados', path: '/tesista/designacion-jurado' },
        // { name: 'Conformidad por los jurados', label: 'Conformidad por los jurados', path: '/tesista/conformidad-jurado' },
        // { name: 'Aprobación del plan de tesis', label: 'Aprobación del plan de tesis', path: '/tesista/aprobacion-proyecto' }
     // ]
    //},
    // {
    //   name: 'Ejecucion',
    //   label: 'Ejecución',
    //   icon: Play,
    //   submenus: [
    //     { name: 'Ejecución del plan de tesis', label: 'Ejecución del plan de tesis', path: '/tesista/progreso' }
    //   ]
    // },
    // {
    //   name: 'InformeFinal',
    //   label: 'Informe Final de Tesis',
    //   icon: ClipboardList,
    //   submenus: [
    //     { name: 'Conformidad del informe final por el asesor', label: 'Conformidad por el asesor', path: '/tesista/conformidad-informe-asesor' },
    //     { name: 'Designacion de jurado para el informe final', label: 'Designación de jurados', path: '/tesista/designacion-informe-jurado' },
    //     { name: 'Conformidad del informe final por los jurados', label: 'Conformidad por los jurados', path: '/tesista/conformidad-informe-jurado' },
    //     { name: 'Conformidad por Comité de Integridad Científica (VRI)', label: 'Conformidad por Comité de Integridad Científica (VRI)', path: '/tesista/conformidad-vri' },
    //     { name: 'Aprobacion del informe final de tesis', label: 'Aprobación del informe final de tesis', path: '/tesista/aprobacion-informe' }
    //   ]
    // },
    // {
    //   name: 'Sustentacion',
    //   label: 'Sustentación',
    //   icon: Presentation,
    //   submenus: [
    //     { name: 'AptoParaSustentar', label: 'Apto para sustentar', path: '/tesista/declaracion-apto-sustentar' },
    //     { name: 'DesignacionFechayHora', label: 'Designación de fecha y hora', path: '/tesista/designacion-fecha-hora' },
    //     { name: 'Sustentación', label: 'Sustentación de tesis', path: '/tesista/sustentacion' }
    //   ]
    // },
    // {
    //   name: 'Herramientas',
    //   label: 'Herramientas',
    //   icon: Settings,
    //   submenus: [
    //     { name: 'Mis Documentos', label: 'Mis Documentos', path: '/tesista/mis-documentos' }
    //   ]
    // }
  ],

  asesor: [
    {
      name: 'PlanDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        {
          name: 'AsesorTecnico',
          label: 'Asesor Técnico',
          isSubmenuGroup: true,
          submenus: [
            { name: 'AceptarAsesoria', label: 'Aceptar Asesoría', path: '/asesor/aceptar-asesoria' },
            { name: 'RevisarPlanTecnico', label: 'Revisar Plan de Tesis', path: '/asesor/revision-plan-tecnico' }
          ]
        },
        {
          name: 'AsesorMetodologico',
          label: 'Asesor Metodológico',
          isSubmenuGroup: true,
          submenus: [
            { name: 'RevisarPlanMetodologico', label: 'Revisar Plan de Tesis', path: '/asesor/revision-plan-metodologico' }
          ]
        },
        {
          name: 'JuradoObjetante',
          label: 'Jurado Objetante',
          isSubmenuGroup: true,
          submenus: [
            { name: 'RevisarPlanJurado', label: 'Revisar Plan de Tesis', path: '/asesor/revision-plan-jurado' }
          ]
        }
      ]
    }
  ],

  programa: [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        { name: 'Designar asesor', label: 'Designación de Asesores', path: '/programa/designar-asesor', namecount: 'pending_offices_adviser' },
        { name: 'Designar jurados', label: 'Designación de Jurados', path: '/programa/designar-jurado', namecount: 'pending_offices_thesis_jury' },
        { name: 'Solicitar resolución aprobación', label: 'Solicitar Resolución de Aprobación', path: '/programa/solicitar-resolucion', namecount: 'pending_resolution_approval' },
        // { name: 'Aprobar Plan de Tesis', label: 'Aprobación de Plan de Tesis', path: '/programa/aprobar-proyecto', namecount: 'pending_offices_thesis_approve' }
      ]
    }
    // {
    //   name: 'InformeFinal',
    //   label: 'Informe Final de Tesis',
    //   icon: ClipboardList,
    //   submenus: [
    //     { name: 'Link de Informe de Tesis', label: 'Link de Informe Final de Tesis', path: '/programa/link-informe', namecount: 'pending_generate_informe' },
    //     { name: 'Designar Jurados Informe de Tesis', label: 'Designar Jurados Informe Final de Tesis', path: '/programa/designar-jurado-informe', namecount: 'pending_offices_asing_juries' },
    //     { name: 'Aprobar Informe de Tesis', label: 'Aprobar Informe Final de Tesis', path: '/programa/aprobar-informe', namecount: 'pending_offices_informe_approve' }
    //   ]
    // },
    // {
    //   name: 'Sustentacion',
    //   label: 'Sustentación',
    //   icon: Presentation,
    //   submenus: [
    //     { name: 'AptoParaSustentar', label: 'Apto para Sustentar', path: '/programa/apto-sustentacion', namecount: 'pending_offices_declare_able' },
    //     { name: 'DesignarFechaHora', label: 'Designar Fecha y Hora', path: '/programa/designar-fecha-hora', namecount: 'pending_offices_asing_date_hour' }
    //   ]
    // },
    // {
    //   name: 'Herramientas',
    //   label: 'Herramientas',
    //   icon: Settings,
    //   submenus: [
    //     { name: 'Gestor de Estudiantes', label: 'Gestor de Estudiantes', path: '/programa/gestor-estudiante' },
    //     { name: 'Gestor de Asesores', label: 'Gestor de Asesores', path: '/programa/gestor-asesor' },
    //     { name: 'Dashboard', label: 'Dashboard', path: '/programa/dashboard' }
    //   ]
    // }
  ],

  facultad: [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        { name: 'Emitir Resolución Asesor', label: 'Emitir Resolución de designación de Asesores', path: '/facultad/emitir-resolucion-asesor' },
        { name: 'Emitir Resolución Jurado', label: 'Emitir Resolución de Designación de Jurado objetante', path: '/facultad/emitir-resolucion-jurado' },
        { name: 'Emitir Resolución Aprobación', label: 'Emitir Resolución de aprobación de Plan de tesis', path: '/facultad/emitir-resolucion-aprobacion' },
        // { name: 'Resolución Aprobación Plan de Tesis', label: 'Resolución Aprobación Plan de Tesis', path: '/facultad/resolucion-proyecto', namecount: 'pending_res_approve_thesis' }
      ]
    }
    // { ... resto comentado ... }
  ],

  vri: [
    // {
    //   name: 'Herramientas',
    //   label: 'Herramientas',
    //   icon: Settings,
    //   submenus: [
    //     { name: 'Gestor de asesores', label: 'Gestor de asesores', path: '/vri-turnitin/gestor-asesor' },
    //     { name: 'Dashboard', label: 'Dashboard', path: '/vri-turnitin/dashboard' }
    //   ]
    // }
  ],

  turnitin: [
    // {
    //   name: 'InformeFinal',
    //   label: 'Informe Final de Tesis',
    //   icon: ClipboardList,
    //   submenus: [
    //     { name: 'Segundo filtro', label: 'Segundo Filtro', path: '/vri-turnitin/segundo-filtro', namecount: 'pending_filter_second' },
    //     { name: 'Tercer filtro', label: 'Tercer Filtro', path: '/vri-turnitin/tercer-filtro', namecount: 'pending_filter_third' }
    //   ]
    // }
  ],

  admin: [
    // {
    //   name: 'Chatbot',
    //   label: 'Chatbot',
    //   icon: Bot,
    //   submenus: [
    //     { name: 'embeddings', label: 'Embeddings', path: '/admin/chatbot/embeddings' },
    //     { name: 'settings', label: 'Configuración', path: '/admin/chatbot/settings' }
    //   ]
    // },
    // { ... resto comentado ... }
  ]
};
