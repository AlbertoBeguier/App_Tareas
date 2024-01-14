import { Todo } from "../models/todo.model";

/**
 *
 * @param {Todo} todo
 */
export const createTodoHTML = todo => {
  if (!todo) throw new Error("A TODO object is required");

  const { done, description, id } = todo;

  // Agregamos un botón de edición y un input oculto para la edición
  const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? "checked" : ""}>
            <label>${description}</label>
            <button class="edit-btn">✏️</button> <!-- Botón de edición -->
            <button class="destroy"></button>
        </div>
        <input class
="edit" value="${description}" style="display: none;"> <!-- Campo oculto para editar -->
`;

  const liElement = document.createElement("li");
  liElement.innerHTML = html;
  liElement.setAttribute("data-id", id);

  if (todo.done) liElement.classList.add("completed");

  return liElement;
};
