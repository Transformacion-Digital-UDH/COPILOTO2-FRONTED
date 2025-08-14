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

export interface SidebarSubmenu {
  name: string;
  label: string;
  path: string;
  namecount?: string;
}

export interface SidebarSection {
  name: string;
  label: string;
  icon: React.ComponentType<any>;
  submenus: SidebarSubmenu[];
}

export const sidebarConfig: Record<string, SidebarSection[]> = {
  estudiante: [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        { name: 'Designacion de asesor', label: 'Designación de asesor', path: '/estudiante/designacion-asesor' },
        { name: 'Conformidad por el asesor', label: 'Conformidad por el asesor', path: '/estudiante/conformidad-asesor' },
        { name: 'Designacion de jurados', label: 'Designación de jurados', path: '/estudiante/designacion-jurado' },
        { name: 'Conformidad por los jurados', label: 'Conformidad por los jurados', path: '/estudiante/conformidad-jurado' },
        { name: 'Aprobación del plan de tesis', label: 'Aprobación del plan de tesis', path: '/estudiante/aprobacion-proyecto' }
      ]
    },
    {
      name: 'Ejecucion',
      label: 'Ejecución',
      icon: Play,
      submenus: [
        { name: 'Ejecución del plan de tesis', label: 'Ejecución del plan de tesis', path: '/estudiante/progreso' }
      ]
    },
    {
      name: 'InformeFinal',
      label: 'Informe Final de Tesis',
      icon: ClipboardList,
      submenus: [
        { name: 'Conformidad del informe final por el asesor', label: 'Conformidad por el asesor', path: '/estudiante/conformidad-informe-asesor' },
        { name: 'Designacion de jurado para el informe final', label: 'Designación de jurados', path: '/estudiante/designacion-informe-jurado' },
        { name: 'Conformidad del informe final por los jurados', label: 'Conformidad por los jurados', path: '/estudiante/conformidad-informe-jurado' },
        { name: 'Conformidad por Comité de Integridad Científica (VRI)', label: 'Conformidad por Comité de Integridad Científica (VRI)', path: '/estudiante/conformidad-vri' },
        { name: 'Aprobacion del informe final de tesis', label: 'Aprobación del informe final de tesis', path: '/estudiante/aprobacion-informe' }
      ]
    },
    {
      name: 'Sustentacion',
      label: 'Sustentación',
      icon: Presentation,
      submenus: [
        { name: 'AptoParaSustentar', label: 'Apto para sustentar', path: '/estudiante/declaracion-apto-sustentar' },
        { name: 'DesignacionFechayHora', label: 'Designación de fecha y hora', path: '/estudiante/designacion-fecha-hora' },
        { name: 'Sustentación', label: 'Sustentación de tesis', path: '/estudiante/sustentacion' }
      ]
    },
    {
      name: 'Herramientas',
      label: 'Herramientas',
      icon: Settings,
      submenus: [
        { name: 'Mis Documentos', label: 'Mis Documentos', path: '/estudiante/mis-documentos' }
      ]
    }
  ],

  asesor: [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        { name: 'SolicitudesAsesoria', label: 'Pendientes de Aceptar Asesoría', path: '/asesor/solicitud-asesoria', namecount: 'pending_solicitudes' },
        { name: 'SolicitudesRevision', label: 'Revisión de Plan de Tesis', path: '/asesor/solicitud-revision', namecount: 'pending_reviews_thesis' },
        { name: 'revision jurado proyecto', label: 'Revisión Jurado Plan de Tesis', path: '/asesor/revision-jurado', namecount: 'pending_reviews_thesis_jury' }
      ]
    },
    {
      name: 'InformeFinal',
      label: 'Informe Final de Tesis',
      icon: ClipboardList,
      submenus: [
        { name: 'Revisión informe', label: 'Revisión de Informe Final de Tesis', path: '/asesor/revision-informe', namecount: 'pending_reviews_informe' },
        { name: 'revision jurado informe', label: 'Revisión Jurado Informe Final de Tesis', path: '/asesor/revisionJurado-informe', namecount: 'pending_reviews_informe_jury' }
      ]
    },
    {
      name: 'Sustentacion',
      label: 'Sustentación',
      icon: Presentation,
      submenus: [
        { name: 'revision jurado sustentacion', label: 'Revisión Jurado de Sustentación', path: '/asesor/revisionJurado-sustentacion', namecount: 'pending_reviews_sus_jury' }
      ]
    }
  ],

  programa: [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        { name: 'Designar asesor', label: 'Designar Asesor', path: '/programa/designar-asesor', namecount: 'pending_offices_adviser' },
        { name: 'Designar jurados', label: 'Designar Jurados', path: '/programa/designar-jurado', namecount: 'pending_offices_thesis_jury' },
        { name: 'Aprobar Plan de Tesis', label: 'Aprobar Plan de Tesis', path: '/programa/aprobar-proyecto', namecount: 'pending_offices_thesis_approve' }
      ]
    },
    {
      name: 'InformeFinal',
      label: 'Informe Final de Tesis',
      icon: ClipboardList,
      submenus: [
        { name: 'Link de Informe de Tesis', label: 'Link de Informe Final de Tesis', path: '/programa/link-informe', namecount: 'pending_generate_informe' },
        { name: 'Designar Jurados Informe de Tesis', label: 'Designar Jurados Informe Final de Tesis', path: '/programa/designar-jurado-informe', namecount: 'pending_offices_asing_juries' },
        { name: 'Aprobar Informe de Tesis', label: 'Aprobar Informe Final de Tesis', path: '/programa/aprobar-informe', namecount: 'pending_offices_informe_approve' }
      ]
    },
    {
      name: 'Sustentacion',
      label: 'Sustentación',
      icon: Presentation,
      submenus: [
        { name: 'AptoParaSustentar', label: 'Apto para Sustentar', path: '/programa/apto-sustentacion', namecount: 'pending_offices_declare_able' },
        { name: 'DesignarFechaHora', label: 'Designar Fecha y Hora', path: '/programa/designar-fecha-hora', namecount: 'pending_offices_asing_date_hour' }
      ]
    },
    {
      name: 'Herramientas',
      label: 'Herramientas',
      icon: Settings,
      submenus: [
        { name: 'Gestor de Estudiantes', label: 'Gestor de Estudiantes', path: '/programa/gestor-estudiante' },
        { name: 'Gestor de Asesores', label: 'Gestor de Asesores', path: '/programa/gestor-asesor' },
        { name: 'Dashboard', label: 'Dashboard', path: '/programa/dashboard' }
      ]
    }
  ],

  facultad: [
    {
      name: 'ProyectoDeTesis',
      label: 'Plan de Tesis',
      icon: FileText,
      submenus: [
        { name: 'Resolución designación asesor', label: 'Resolución Designación Asesor', path: '/facultad/resolucion-asesor', namecount: 'pending_res_asing_adviser' },
        { name: 'Resolución Aprobación Plan de Tesis', label: 'Resolución Aprobación Plan de Tesis', path: '/facultad/resolucion-proyecto', namecount: 'pending_res_approve_thesis' }
      ]
    },
    {
      name: 'InformeFinal',
      label: 'Informe Final de Tesis',
      icon: ClipboardList,
      submenus: [
        { name: 'Designar Jurados Informe Final de Tesis', label: 'Designar Jurados Informe Final de Tesis', path: '/facultad/designarJurado-informe', namecount: 'pending_res_asing_juries' },
        { name: 'Resolución Informe Final de Tesis', label: 'Resolución Informe Final de Tesis', path: '/facultad/resolucion-informe', namecount: 'pending_res_approve_informe' }
      ]
    },
    {
      name: 'Sustentacion',
      label: 'Sustentación',
      icon: Presentation,
      submenus: [
        { name: 'ResolucionApto', label: 'Resolución Apto Sustentar', path: '/facultad/resolucion-apto', namecount: 'pending_res_apto_declaration' },
        { name: 'ResolucionFechaHora', label: 'Resolución Fecha y Hora para Sustentar', path: '/facultad/resolucion-fecha-hora', namecount: 'pending_res_asing_date_hour' }
      ]
    }
  ],

  vri: [
    {
      name: 'Herramientas',
      label: 'Herramientas',
      icon: Settings,
      submenus: [
        { name: 'Gestor de asesores', label: 'Gestor de asesores', path: '/vri-turnitin/gestor-asesor' },
        { name: 'Dashboard', label: 'Dashboard', path: '/vri-turnitin/dashboard' }
      ]
    }
  ],

  turnitin: [
    {
      name: 'InformeFinal',
      label: 'Informe Final de Tesis',
      icon: ClipboardList,
      submenus: [
        { name: 'Segundo filtro', label: 'Segundo Filtro', path: '/vri-turnitin/segundo-filtro', namecount: 'pending_filter_second' },
        { name: 'Tercer filtro', label: 'Tercer Filtro', path: '/vri-turnitin/tercer-filtro', namecount: 'pending_filter_third' }
      ]
    }
  ],

  admin: [
    {
      name: 'Chatbot',
      label: 'Chatbot',
      icon: Bot,
      submenus: [
        { name: 'embeddings', label: 'Embeddings', path: '/admin/chatbot/embeddings' },
        { name: 'settings', label: 'Configuración', path: '/admin/chatbot/settings' }
      ]
    },
    {
      name: 'Usuarios',
      label: 'Usuarios',
      icon: Users,
      submenus: [
        { name: 'users', label: 'Usuarios', path: '/admin/usuarios' }
      ]
    },
    {
      name: 'Reportes',
      label: 'Reportes',
      icon: Settings,
      submenus: [
        { name: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' }
      ]
    }
  ]
};
