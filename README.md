# Copiloto de Investigación UDH

Sistema de gestión y acompañamiento para el proceso de investigación académica de la Universidad de Huánuco.

## 📋 Descripción

**Copiloto UDH** es una plataforma web desarrollada en React que facilita y optimiza el proceso de investigación académica mediante la gestión integral de proyectos de investigación, coordinación entre diferentes actores académicos y seguimiento de metodologías de investigación.

## 🏗️ Arquitectura del Proyecto
## 🚀 Tecnologías

- **Frontend**: React 19 + Vite
- **Routing**: React Router DOM 7
- **Styling**: Tailwind CSS 4
- **State Management**: Context API / Zustand (por definir)
- **HTTP Client**: Fetch API / Axios
- **Build Tool**: Vite
- **Linting**: ESLint

## 📁 Estructura del Proyecto

```
src/
├── assets/                     # Recursos estáticos
├── components/                 # Componentes reutilizables globales
├── features/                   # Módulos por actor
│   ├── asesorado/             # Módulo del estudiante
│   ├── asesor-tecnico/        # Módulo del asesor técnico
│   ├── asesor-metodologico/   # Módulo del asesor metodológico
│   ├── coordinacion/          # Módulo de coordinación
│   ├── facultad/              # Módulo de facultad
│   ├── jurado-objetante/      # Módulo de jurado objetante
│   ├── jurados/               # Módulo de jurados evaluadores
│   └── auth/                  # Autenticación común
├── layouts/                   # Layouts de la aplicación
├── pages/                     # Páginas generales
├── router/                    # Configuración de rutas
├── hooks/                     # Custom hooks
├── stores/                    # Estado global
├── services/                  # Servicios API
├── utils/                     # Funciones utilitarias
└── types/                     # Tipos TypeScript (si se usa)
```

### 🔧 Estructura de cada Feature/Módulo

Cada módulo de actor sigue la siguiente estructura:

```
features/[actor]/
├── components/               # Componentes específicos del actor
├── pages/                   # Páginas del módulo
├── services/                # APIs específicas del actor
└── hooks/                   # Hooks específicos del módulo
```

## 🎯 Features por Módulo

### 👨‍🎓 Asesorado


### 👨‍🏫 Asesor Técnico


### 🔬 Asesor Metodológico


### 📊 Coordinación

### 🏛️ Facultad


### ⚖️ Jurado Objetante


### 👥 Jurados


## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm run dev
```

```
## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting del código
```

