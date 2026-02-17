# Ejemplos de Uso

Esta guía contiene ejemplos prácticos de cómo usar la estructura del proyecto.

## 1. Crear un nuevo Repository

Crea un repositorio específico para tu tabla. Por ejemplo, para `clientes`:

```javascript
// src/lib/repositories/clientes.repository.js
import { supabase } from '../supabase/client';

export class ClientesRepository {
  /**
   * Obtiene todos los clientes activos
   */
  static async getAllActive() {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('activo', true)
        .order('nombre', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      return { data: null, error };
    }
  }

  /**
   * Busca clientes por nombre
   */
  static async searchByName(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .ilike('nombre', `%${searchTerm}%`);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error al buscar clientes:', error);
      return { data: null, error };
    }
  }

  /**
   * Crea un nuevo cliente
   */
  static async create(cliente) {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert({
          nombre: cliente.nombre,
          email: cliente.email,
          telefono: cliente.telefono,
          activo: true,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error al crear cliente:', error);
      return { data: null, error };
    }
  }
}
```

## 2. Crear un Composable

Crea un composable que use el repositorio:

```javascript
// src/composables/useClientes.js
import { ClientesRepository } from '../lib/repositories/clientes.repository';

export function useClientes() {
  const getActiveClientes = async () => {
    const { data, error } = await ClientesRepository.getAllActive();

    if (error) {
      console.error('Error al obtener clientes activos:', error);
      return { clientes: [], error };
    }

    return { clientes: data, error: null };
  };

  const searchClientes = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 2) {
      return { clientes: [], error: null };
    }

    const { data, error } = await ClientesRepository.searchByName(searchTerm);

    if (error) {
      console.error('Error al buscar clientes:', error);
      return { clientes: [], error };
    }

    return { clientes: data, error: null };
  };

  const createCliente = async (clienteData) => {
    // Validaciones básicas
    if (!clienteData.nombre || !clienteData.email) {
      return {
        cliente: null,
        error: new Error('Nombre y email son obligatorios')
      };
    }

    const { data, error } = await ClientesRepository.create(clienteData);

    if (error) {
      console.error('Error al crear cliente:', error);
      return { cliente: null, error };
    }

    return { cliente: data, error: null };
  };

  return {
    getActiveClientes,
    searchClientes,
    createCliente,
  };
}
```

## 3. Crear un Componente

Crea un componente reutilizable:

```astro
---
// src/components/ClienteCard.astro
interface Props {
  nombre: string;
  email: string;
  telefono?: string;
  onEdit?: () => void;
}

const { nombre, email, telefono } = Astro.props;
---

<div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
  <div class="flex items-start justify-between">
    <div>
      <h3 class="text-lg font-semibold text-gray-900">{nombre}</h3>
      <p class="text-sm text-gray-600 mt-1">{email}</p>
      {telefono && (
        <p class="text-sm text-gray-500 mt-1">{telefono}</p>
      )}
    </div>
    <button
      class="text-blue-600 hover:text-blue-800 text-sm font-medium"
      onclick="alert('Editar cliente')"
    >
      Editar
    </button>
  </div>
</div>
```

## 4. Crear una Página

Usa todo junto en una página:

```astro
---
// src/pages/clientes.astro
import Layout from '../layouts/Layout.astro';
import ClienteCard from '../components/ClienteCard.astro';
import { useClientes } from '../composables/useClientes';

const { getActiveClientes } = useClientes();
const { clientes, error } = await getActiveClientes();

if (error) {
  console.error('Error cargando clientes:', error);
}
---

<Layout title="Clientes - Sistema de Gestión">
  <main class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Clientes</h1>
      <p class="text-gray-600 mt-2">
        Gestión de clientes del sistema
      </p>
    </div>

    {error && (
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p class="text-red-800">
          Error al cargar los clientes. Por favor, intenta de nuevo.
        </p>
      </div>
    )}

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clientes && clientes.length > 0 ? (
        clientes.map((cliente) => (
          <ClienteCard
            nombre={cliente.nombre}
            email={cliente.email}
            telefono={cliente.telefono}
          />
        ))
      ) : (
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500">No hay clientes registrados</p>
        </div>
      )}
    </div>
  </main>
</Layout>
```

## 5. Página con Formulario Interactivo

Astro permite usar JavaScript del lado del cliente para interactividad:

```astro
---
// src/pages/clientes/nuevo.astro
import Layout from '../../layouts/Layout.astro';
---

<Layout title="Nuevo Cliente">
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Nuevo Cliente</h1>

    <form id="clienteForm" class="max-w-lg bg-white rounded-lg shadow p-6">
      <div class="mb-4">
        <label for="nombre" class="block text-sm font-medium text-gray-700 mb-2">
          Nombre *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div class="mb-6">
        <label for="telefono" class="block text-sm font-medium text-gray-700 mb-2">
          Teléfono
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Crear Cliente
      </button>
    </form>

    <div id="mensaje" class="mt-4 hidden"></div>
  </main>
</Layout>

<script>
  import { supabase } from '../../lib/supabase/client';

  const form = document.getElementById('clienteForm') as HTMLFormElement;
  const mensajeDiv = document.getElementById('mensaje') as HTMLDivElement;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const cliente = {
      nombre: formData.get('nombre') as string,
      email: formData.get('email') as string,
      telefono: formData.get('telefono') as string || null,
      activo: true,
    };

    try {
      const { data, error } = await supabase
        .from('clientes')
        .insert(cliente)
        .select()
        .single();

      if (error) throw error;

      // Mostrar mensaje de éxito
      mensajeDiv.className = 'mt-4 bg-green-50 border border-green-200 rounded-lg p-4';
      mensajeDiv.innerHTML = '<p class="text-green-800">Cliente creado exitosamente</p>';
      mensajeDiv.classList.remove('hidden');

      // Resetear formulario
      form.reset();

      // Opcional: redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = '/clientes';
      }, 2000);

    } catch (error) {
      console.error('Error al crear cliente:', error);

      mensajeDiv.className = 'mt-4 bg-red-50 border border-red-200 rounded-lg p-4';
      mensajeDiv.innerHTML = '<p class="text-red-800">Error al crear el cliente</p>';
      mensajeDiv.classList.remove('hidden');
    }
  });
</script>
```

## 6. Usando Islands (Componentes Interactivos)

Para componentes altamente interactivos, puedes usar frameworks como React, Vue o Svelte:

```bash
# Instalar integración de React (ejemplo)
npx astro add react
```

Luego crea un componente interactivo:

```tsx
// src/components/SearchClientes.tsx
import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

export default function SearchClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.length < 2) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .ilike('nombre', `%${searchTerm}%`);

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Error buscando clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleSearch}
        placeholder="Buscar clientes..."
        className="w-full px-4 py-2 border rounded-lg"
      />

      {loading && <p>Buscando...</p>}

      <div className="mt-4">
        {clientes.map((cliente: any) => (
          <div key={cliente.id} className="p-4 border rounded mb-2">
            <h3 className="font-bold">{cliente.nombre}</h3>
            <p className="text-sm text-gray-600">{cliente.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Úsalo en una página con la directiva `client:load`:

```astro
---
import Layout from '../layouts/Layout.astro';
import SearchClientes from '../components/SearchClientes';
---

<Layout title="Buscar Clientes">
  <SearchClientes client:load />
</Layout>
```

## Notas Importantes

1. **Variables de Entorno**: Recuerda que las variables con prefijo `PUBLIC_` están disponibles en el cliente
2. **Server vs Client**: El código en `---` se ejecuta en el servidor, el código en `<script>` en el cliente
3. **Islands**: Usa `client:load`, `client:idle`, `client:visible` según necesites
4. **SEO**: Astro renderiza todo en el servidor por defecto, excelente para SEO

## Recursos Adicionales

- [Astro Islands](https://docs.astro.build/en/concepts/islands/)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Tailwind CSS](https://tailwindcss.com/docs)
