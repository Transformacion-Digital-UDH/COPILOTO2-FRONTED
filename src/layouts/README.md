# Sistema de Layouts - UDH

Sistema de layouts base reutilizable para todas las páginas del sistema.

## 🎯 Implementación Actual

El sistema usa **StandardLayout** como layout base que incluye:
- ✅ Header con navegación y controles de usuario
- ✅ Sidebar con menús específicos por rol
- ✅ Área de contenido principal responsive
- ✅ Animaciones sincronizadas y tema dinámico

## 📋 Cómo funciona actualmente

```
ProvidersWrapper (Providers + StandardLayout)
    ↓
Header + Sidebar + MainContent
    ↓
Tus páginas/componentes
```

### Uso en nuevas páginas:

```jsx
// En el router
<Route 
  path="/tu-pagina" 
  element={
    <ProvidersWrapper>
      <TuPaginaComponent />
    </ProvidersWrapper>
  } 
/>

// Tu componente solo necesita el contenido
const TuPaginaComponent = () => {
  return (
    <div>
      <h1>Tu contenido aquí</h1>
      {/* El layout (header, sidebar) se aplica automáticamente */}
    </div>
  );
};
```

## 🚀 Layouts Disponibles para Casos Especiales

Si necesitas un layout diferente, puedes usar:

### **FocusLayout** - Sin sidebar (para concentración)
```jsx
import { FocusLayout } from '../layouts/index.jsx';

<FocusLayout>
  <DocumentEditor />
</FocusLayout>
```

### **ProcessLayout** - Para flujos paso a paso
```jsx
import { ProcessLayout } from '../layouts/index.jsx';

<ProcessLayout>
  <FormularioPasos />
</ProcessLayout>
```

### **CleanLayout** - Sin navegación
```jsx
import { CleanLayout } from '../layouts/index.jsx';

<CleanLayout>
  <ModalOFormulario />
</CleanLayout>
```

## ✅ Buenas Prácticas

1. **Usa ProvidersWrapper por defecto** - Incluye todos los providers necesarios + StandardLayout
2. **Solo incluye el contenido** en tus componentes de página
3. **Usa layouts específicos** solo cuando sea realmente necesario
4. **El layout se adapta automáticamente** según el rol del usuario

## 📁 Archivos del Sistema

- `RoleBasedLayout.jsx` - Layout base configurable
- `index.jsx` - Exporta todos los layouts disponibles
- `AuthLayout.jsx` - Layout específico para autenticación

## 🎯 Resultado

Tu página automáticamente tendrá:
- ✅ Header con botones según el rol
- ✅ Sidebar con menús específicos del usuario
- ✅ Tema claro/oscuro
- ✅ Animaciones suaves
- ✅ Diseño responsive
