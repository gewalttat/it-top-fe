const state = {
  todos: [],
  filter: 'all',
  search: '',
};

const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const searchInput = document.querySelector('#searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompletedBtn');
const totalCount = document.querySelector('#totalCount');
const activeCount = document.querySelector('#activeCount');
const doneCount = document.querySelector('#doneCount');

function createIdGenerator() {
  let counter = 0;
  return function () {
    counter += 1;
    return counter;
  };
}

const generateId = createIdGenerator();

function saveTodo(todo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(todo);
    }, 500);
  });
}

function createDeleteHandler(id) {
  return function () {
    deleteTodo(id);
  };
}

function createToggleHandler(id) {
  return function () {
    toggleTodo(id);
  };
}

async function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  const submitButton = todoForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняем...';

  const newTodo = {
    id: generateId(),
    text: text,
    completed: false,
  };

  await saveTodo(newTodo);

  state.todos.push(newTodo);
  todoInput.value = '';
  renderTodos();

  submitButton.disabled = false;
  submitButton.textContent = 'Добавить';
}

function deleteTodo(id) {
  state.todos = state.todos.filter((todo) => todo.id !== id);
  renderTodos();
}

function toggleTodo(id) {
  const todo = state.todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

function searchTodos() {
  state.search = searchInput.value;
  renderTodos();
}

function getFilteredTodos() {
  return state.todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(state.search.toLowerCase());
    if (state.filter === 'active') return !todo.completed && matchesSearch;
    if (state.filter === 'completed') return todo.completed && matchesSearch;
    return matchesSearch;
  });
}

function renderTodos() {
  const filtered = getFilteredTodos();
  todoList.innerHTML = '';

  if (filtered.length === 0) {
    todoList.innerHTML = '<li class="empty-state">Ничего не найдено</li>';
  } else {
    filtered.forEach((todo) => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.dataset.id = todo.id;
      checkbox.addEventListener('change', createToggleHandler(todo.id));

      const span = document.createElement('span');
      span.className = 'todo-text';
      span.textContent = todo.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '✕';
      deleteBtn.dataset.id = todo.id;
      deleteBtn.addEventListener('click', createDeleteHandler(todo.id));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  updateStats();
}

function updateStats() {
  const total = state.todos.length;
  const active = state.todos.filter((t) => !t.completed).length;
  const done = state.todos.filter((t) => t.completed).length;

  totalCount.textContent = total;
  activeCount.textContent = active;
  doneCount.textContent = done;
}

function clearCompleted() {
  state.todos = state.todos.filter((todo) => !todo.completed);
  renderTodos();
}

function setActiveFilter(button) {
  state.filter = button.dataset.filter;
  filterButtons.forEach((btn) => btn.classList.remove('active'));
  button.classList.add('active');
  renderTodos();
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

searchInput.addEventListener('input', () => {
  searchTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveFilter(button);
  });
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompleted();
});

renderTodos();
updateStats();