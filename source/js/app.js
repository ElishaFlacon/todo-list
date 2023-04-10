// Переменныe
const todoInput = document.querySelector('.todo-form__input');
const todoButton = document.querySelector('.todo-form__button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// Ивенты
document.addEventListener('DOMContentLoaded', getData);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filter)


// Функции

function limitText(limitField, limitNum) {
    if (limitField.value.length > limitNum) {
        limitField.value = limitField.value.substring(0, limitNum);
    }
}


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
    // Закидываем тудушки в LocalХранилище
    saveData([todoInput.value, 0]);
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
    // Удаление
    if (item.classList[0] === 'todo__delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        clearData(todo.children[0].innerText)
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    };
    // Выполненно
    if (item.classList[0] === 'todo__complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        let todos = checkData();
        todos.map((t) => {
            if (t[0] === todo.innerText) {
                t[1] == 0 ? t[1] = 1 : t[1] = 0;

                clearData(t[0]);
                saveData(t);
            }
        });
    };
}


function filter(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}


function checkData() {
    // Проверяем наличие данных
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    return todos;
}


function saveData(data) {
    let todos = checkData()
    todos.push(data);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getData() {
    let todos = checkData()
    todos.forEach(function (todo) {
        // Создаем div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //  Создаем li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo[0];
        newTodo.classList.add('todo__item');
        if (todo[1]) {
            todoDiv.classList.toggle('completed');
        }
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
    });
}


function clearData(data) {
    let todos = checkData()
    let todoIndex = '';
    todos.forEach((todo) => {
        if (todo[0] === data) {
            todoIndex = todo;
        }
    })
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
