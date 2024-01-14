// Importaciones necesarias
import html from "./app.html?raw";
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos, renderPending } from "./use-cases";

// Identificadores de los elementos HTML
const ElementIDs = {
  ClearCompletedButton: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};

// Función principal de la aplicación
export const App = elementId => {
  // Función para mostrar las tareas
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(ElementIDs.TodoList, todos);
    updatePendingCount();
  };

  // Función para actualizar el contador de tareas pendientes
  const updatePendingCount = () => {
    renderPending(ElementIDs.PendingCountLabel);
  };

  // Inicialización de la aplicación
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias a elementos HTML
  const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
  const todoListUL = document.querySelector(ElementIDs.TodoList);
  const clearCompletedButton = document.querySelector(
    ElementIDs.ClearCompletedButton
  );
  const filtersLIs = document.querySelectorAll(ElementIDs.TodoFilters);

  // Manejador de eventos para añadir nuevas tareas
  newDescriptionInput.addEventListener("keyup", event => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    actualizarBotonPendientes();
    event.target.value = "";
  });

  // Manejador de eventos para cambiar el estado de una tarea
  todoListUL.addEventListener("click", event => {
    if (event.target.classList.contains("toggle")) {
      const element = event.target.closest("[data-id]");
      todoStore.toggleTodo(element.getAttribute("data-id"));
      displayTodos();
      actualizarBotonPendientes();
    }
  });

  // Manejador de eventos para eliminar una tarea
  todoListUL.addEventListener("click", event => {
    if (event.target.classList.contains("destroy")) {
      const element = event.target.closest("[data-id]");
      todoStore.deleteTodo(element.getAttribute("data-id"));
      displayTodos();
      actualizarBotonPendientes();
    }
  });

  // Manejador de eventos para borrar todas las tareas completadas
  clearCompletedButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
    actualizarBotonPendientes();
  });

  // Manejador de eventos para los filtros de tareas
  filtersLIs.forEach(element => {
    element.addEventListener("click", event => {
      filtersLIs.forEach(el => el.classList.remove("selected"));
      event.target.classList.add("selected");
      switch (event.target.text) {
        case "Todas":
          todoStore.setFilter(Filters.All);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
        case "Completadas":
          todoStore.setFilter(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });

  // Manejador de eventos para el botón de edición de tarea
  todoListUL.addEventListener("click", event => {
    if (event.target.classList.contains("edit-btn")) {
      const liElement = event.target.closest("li");
      const inputElement = liElement.querySelector(".edit");
      liElement.classList.add("editing");
      inputElement.style.display = "block"; // Mostrar el campo de entrada
      inputElement.focus();

      event.stopPropagation(); // Evitar que el evento se propague
    }
  });

  // Manejador de eventos para guardar la edición de una tarea
  todoListUL.addEventListener("keyup", event => {
    if (event.key !== "Enter" || !event.target.classList.contains("edit"))
      return;
    const liElement = event.target.closest("li");
    const newDescription = event.target.value.trim();
    const todoId = liElement.getAttribute("data-id");

    if (newDescription.length > 0) {
      todoStore.updateTodoDescription(todoId, newDescription);
      const labelElement = liElement.querySelector("label");
      labelElement.textContent = newDescription;
    }

    liElement.classList.remove("editing");
    event.target.style.display = "none"; // Ocultar el campo de entrada
  });
};

function actualizarBotonPendientes() {
  const botonPendientes = document.querySelector(".filtro-pendientes");
  const tareasPendientes = todoStore.getTodos(Filters.Pending).length;

  if (tareasPendientes > 0) {
    botonPendientes.classList.add("boton-titilar");
  } else {
    botonPendientes.classList.remove("boton-titilar");
  }
}
