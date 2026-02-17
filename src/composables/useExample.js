import { ExampleRepository } from '../lib/repositories/example.repository';

/**
 * Composable de ejemplo
 *
 * Los composables son funciones reutilizables que encapsulan lógica de negocio.
 * Este es un ejemplo de cómo usar un repositorio desde un composable.
 */

/**
 * Hook para gestionar datos de ejemplo
 * @param {string} tableName - Nombre de la tabla
 */
export function useExample(tableName) {
  /**
   * Obtiene todos los registros
   */
  const fetchAll = async () => {
    const { data, error } = await ExampleRepository.getAll(tableName);

    if (error) {
      console.error('Error al obtener registros:', error);
      return { data: [], error };
    }

    return { data, error: null };
  };

  /**
   * Obtiene un registro por ID
   */
  const fetchById = async (id) => {
    const { data, error } = await ExampleRepository.getById(tableName, id);

    if (error) {
      console.error('Error al obtener registro:', error);
      return { data: null, error };
    }

    return { data, error: null };
  };

  /**
   * Crea un nuevo registro
   */
  const create = async (record) => {
    const { data, error } = await ExampleRepository.create(tableName, record);

    if (error) {
      console.error('Error al crear registro:', error);
      return { data: null, error };
    }

    return { data, error: null };
  };

  /**
   * Actualiza un registro
   */
  const update = async (id, updates) => {
    const { data, error } = await ExampleRepository.update(tableName, id, updates);

    if (error) {
      console.error('Error al actualizar registro:', error);
      return { data: null, error };
    }

    return { data, error: null };
  };

  /**
   * Elimina un registro
   */
  const remove = async (id) => {
    const { error } = await ExampleRepository.delete(tableName, id);

    if (error) {
      console.error('Error al eliminar registro:', error);
      return { error };
    }

    return { error: null };
  };

  return {
    fetchAll,
    fetchById,
    create,
    update,
    remove,
  };
}
