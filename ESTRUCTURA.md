# Estructura del Proyecto Web

Este proyecto Astro sigue una arquitectura organizada en capas para facilitar el mantenimiento y escalabilidad.

## Estructura de Directorios

```
src/
├── components/          # Componentes reutilizables de UI
│   └── ExampleCard.astro
├── composables/         # Lógica de negocio reutilizable
│   └── useExample.js
├── layouts/            # Layouts compartidos
│   └── Layout.astro
├── lib/                # Librerías y utilidades
│   ├── supabase/
│   │   └── client.js   # Cliente de Supabase configurado
│   └── repositories/   # Capa de acceso a datos
│       └── example.repository.js
├── pages/              # Páginas de la aplicación (rutas)
│   └── index.astro
└── styles/             # Estilos globales
    └── global.css      # Configuración de Tailwind
```

## Arquitectura en Capas

### 1. **Repositories** (`lib/repositories/`)
- Capa de acceso a datos
- Interactúa directamente con Supabase
- Métodos CRUD genéricos
- Manejo de errores centralizado

**Ejemplo:**
```javascript
import { ExampleRepository } from '../lib/repositories/example.repository';

const { data, error } = await ExampleRepository.getAll('clientes');
```

### 2. **Composables** (`composables/`)
- Lógica de negocio reutilizable
- Utilizan los repositorios
- Pueden agregar validaciones o transformaciones
- Funciones que se pueden compartir entre componentes

**Ejemplo:**
```javascript
import { useExample } from '../composables/useExample';

const { fetchAll, create, update, remove } = useExample('clientes');
const { data } = await fetchAll();
```

### 3. **Components** (`components/`)
- Componentes de UI reutilizables
- Reciben props para personalización
- No contienen lógica de negocio compleja

**Ejemplo:**
```astro
<ExampleCard
  title="Mi Tarjeta"
  description="Descripción de ejemplo"
  link="/ver-mas"
/>
```

### 4. **Layouts** (`layouts/`)
- Plantillas compartidas para páginas
- Incluyen estructura HTML común (head, body, etc.)
- Definen estilos y meta tags globales

**Ejemplo:**
```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Mi Página">
  <h1>Contenido aquí</h1>
</Layout>
```

### 5. **Pages** (`pages/`)
- Páginas de la aplicación
- Cada archivo se convierte en una ruta
- Utilizan layouts, componentes y composables

## Configuración de Supabase

### Cliente de Supabase
El cliente está configurado en `src/lib/supabase/client.js` y utiliza variables de entorno:

```javascript
import { supabase } from '../lib/supabase/client';
```

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

## Flujo de Datos Recomendado

```
Page → Composable → Repository → Supabase
  ↓        ↓            ↓
Layout  Component   Validación
```

### Ejemplo completo:

```astro
---
// src/pages/clientes.astro
import Layout from '../layouts/Layout.astro';
import { useExample } from '../composables/useExample';

const { fetchAll } = useExample('clientes');
const { data: clientes } = await fetchAll();
---

<Layout title="Clientes">
  <main>
    <h1>Lista de Clientes</h1>
    {clientes?.map(cliente => (
      <div>{cliente.nombre}</div>
    ))}
  </main>
</Layout>
```

## Convenciones del Proyecto

- **Idioma UI**: Español (Argentina)
- **Idioma código**: Inglés (nombres de variables, funciones, etc.)
- **CSS Framework**: Tailwind CSS v4
- **Gestor de paquetes**: npm
- **Base de datos**: Supabase PostgreSQL

## Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Vista previa del build
npm run preview

# Agregar integraciones
npx astro add [nombre]
```

## Próximos Pasos

1. Configurar variables de entorno (`.env`)
2. Crear repositorios específicos para tus tablas
3. Crear composables con lógica de negocio
4. Diseñar componentes de UI reutilizables
5. Construir páginas usando la arquitectura definida

## Recursos

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
