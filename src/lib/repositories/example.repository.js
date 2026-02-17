import { supabase } from '../supabase/client';

/**
 * Example Repository
 *
 * Este es un ejemplo de repositorio siguiendo el patrón del proyecto admin.
 * Aquí defines las operaciones de base de datos para una tabla específica.
 */

export class ExampleRepository {
  /**
   * Obtiene todos los registros de una tabla
   * @param {string} tableName - Nombre de la tabla
   * @returns {Promise<{data: Array, error: Error|null}>}
   */
  static async getAll(tableName) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*');

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error(`Error fetching all from ${tableName}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Obtiene un registro por ID
   * @param {string} tableName - Nombre de la tabla
   * @param {string} id - ID del registro
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  static async getById(tableName, id) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error(`Error fetching ${tableName} by id:`, error);
      return { data: null, error };
    }
  }

  /**
   * Crea un nuevo registro
   * @param {string} tableName - Nombre de la tabla
   * @param {Object} record - Datos del registro
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  static async create(tableName, record) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert(record)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error(`Error creating ${tableName}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Actualiza un registro
   * @param {string} tableName - Nombre de la tabla
   * @param {string} id - ID del registro
   * @param {Object} updates - Datos a actualizar
   * @returns {Promise<{data: Object|null, error: Error|null}>}
   */
  static async update(tableName, id, updates) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error(`Error updating ${tableName}:`, error);
      return { data: null, error };
    }
  }

  /**
   * Elimina un registro
   * @param {string} tableName - Nombre de la tabla
   * @param {string} id - ID del registro
   * @returns {Promise<{error: Error|null}>}
   */
  static async delete(tableName, id) {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error(`Error deleting ${tableName}:`, error);
      return { error };
    }
  }
}
