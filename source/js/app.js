// Переменныe
const todoInput = document.querySelector('.todo-form__input');
const todoButton = document.querySelector('.todo-form__button');
const todoList = document.querySelector('.todo-list');

// Ивенты
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);

// Функции
function addTodo(event) {
    // Очищаем ивенты
    event.preventDefault();
    // Создаем div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //  Создаем li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo__item');
    todoDiv.appendChild(newTodo);
    //  Создаем кнопку завершения задачи
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    completedButton.classList.add('todo__complete-btn');
    todoDiv.appendChild(completedButton);
    // Создаем кнопку удаления задачи
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-regular fa-square-minus"></i>';
    deleteButton.classList.add('todo__delete-btn');
    todoDiv.appendChild(deleteButton);
    // Добовляем элементы на страницу
    todoList.appendChild(todoDiv);
    //  Очищаем инпут
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === 'todo__delete-btn') {
        const todo = item.parentElement;
        todo.remove();
    };
}