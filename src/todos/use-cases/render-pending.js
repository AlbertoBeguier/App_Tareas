// Importación de todoStore y los filtros para acceder a las tareas y sus estados
import todoStore, { Filters } from "../../store/todo.store";

// Variable para almacenar la referencia al elemento HTML del contador de tareas pendientes
let element;

/**
 * Actualiza el contenido del contador de tareas pendientes y el estado del botón Pendientes.
 *
 * @param {String} elementId - El ID del elemento HTML del contador de tareas pendientes.
 */
export const renderPending = elementId => {
  // Si no hay una referencia al elemento, la obtiene usando el ID proporcionado
  if (!element) element = document.querySelector(elementId);

  // Si no se encuentra el elemento, lanza un error
  if (!element) throw new Error(`Element ${elementId} not found`);

  // Obtiene el número de tareas pendientes
  const tareasPendientes = todoStore.getTodos(Filters.Pending).length;

  // Actualiza el contenido del elemento con el número de tareas pendientes
  element.innerHTML = tareasPendientes;

  // Llama a la función para actualizar el estado visual del botón Pendientes
  actualizarBotonPendientes(tareasPendientes);
};

/**
 * Actualiza el estado visual del botón Pendientes basado en el número de tareas pendientes.
 *
 * @param {number} tareasPendientes - Número de tareas pendientes.
 */
function actualizarBotonPendientes(tareasPendientes) {
  // Obtiene el botón Pendientes por su clase
  const botonPendientes = document.querySelector(".filtro-pendientes");

  // Si hay tareas pendientes, agrega la clase para hacerlo titilar
  if (tareasPendientes > 0) {
    botonPendientes.classList.add("boton-titilar");
  } else {
    // Si no hay tareas pendientes, remueve la clase para detener el titileo
    botonPendientes.classList.remove("boton-titilar");
  }
}
