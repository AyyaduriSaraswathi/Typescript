"use strict";
const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
let todos = [];
function renderTodos() {
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
function addTodo(text) {
    const newTodo = {
        id: Date.now(),
        text,
        completed: false
    };
    todos.push(newTodo);
    renderTodos();
}
function toggleTodo(id) {
    todos = todos.map(todo => todo.id === id ? Object.assign(Object.assign({}, todo), { completed: !todo.completed }) : todo);
    renderTodos();
}
function deleteTodo(id) {
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
