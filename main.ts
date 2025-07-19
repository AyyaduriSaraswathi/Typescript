interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

const input = document.getElementById("todo-input") as HTMLInputElement;
const addButton = document.getElementById("add-button") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

let todos: TodoItem[] = [];

function renderTodos(): void {
  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.style.textDecoration = todo.completed ? "line-through" : "none";

    li.addEventListener("click", () => toggleTodo(todo.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    });

    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function addTodo(text: string): void {
  const newTodo: TodoItem = {
    id: Date.now(),
    text,
    completed: false
  };
  todos.push(newTodo);
  renderTodos();
}

function toggleTodo(id: number): void {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id: number): void {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

addButton.addEventListener("click", () => {
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
  }
});
