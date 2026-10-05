// ===== Состояние приложения =====
const state = {
  todos: [],
  filter: 'all',
  search: '',
  isLoading: false,
};

// ===== DOM-элементы =====
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const searchInput = document.querySelector('#searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedBtn = document.querySelector('#clearCompletedBtn');
const totalCount = document.querySelector('#totalCount');
const activeCount = document.querySelector('#activeCount');
const doneCount = document.querySelector('#doneCount');
const headerBadge = document.querySelector('.header-badge');

const STORAGE_KEY = 'todo-list-state';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('Не удалось прочитать localStorage:', e);
    return [];
  }
}

function persistTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  } catch (e) {
    console.warn('Не удалось сохранить в localStorage:', e);
  }
}

function saveTodo(todo) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(todo), 500);
  });
}

function removeTodoAsync(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(id), 400);
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

function createTodoItem(todo) {
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

  li.append(checkbox, span, deleteBtn);
  return li;
}

async function addTodo() {
  const text = todoInput.value.trim();
  if (!text || state.isLoading) return;

  const submitButton = todoForm.querySelector('button[type="submit"]');
  state.isLoading = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняем...';

  const newTodo = {
    id: Date.now(),
    text,
    completed: false,
  };

  try {
    await saveTodo(newTodo);
    state.todos.push(newTodo);
    todoInput.value = '';
    persistTodos();
    renderTodos();
  } catch (e) {
    console.error('Ошибка добавления задачи:', e);
  } finally {
    state.isLoading = false;
    submitButton.disabled = false;
    submitButton.textContent = 'Добавить';
  }
}

async function deleteTodo(id) {
  if (state.isLoading) return;
  state.isLoading = true;

  try {
    await removeTodoAsync(id);
    state.todos = state.todos.filter((todo) => todo.id !== id);
    persistTodos();
    renderTodos();
  } catch (e) {
    console.error('Ошибка удаления задачи:', e);
  } finally {
    state.isLoading = false;
  }
}

function toggleTodo(id) {
  const todo = state.todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  persistTodos();
  renderTodos();
}

function clearCompleted() {
  state.todos = state.todos.filter((todo) => !todo.completed);
  persistTodos();
  renderTodos();
}

function getFilteredTodos() {
  const search = state.search.trim().toLowerCase();

  return state.todos.filter((todo) => {
    const matchesSearch = todo.text.toLowerCase().includes(search);

    if (state.filter === 'active') return !todo.completed && matchesSearch;
    if (state.filter === 'completed') return todo.completed && matchesSearch;
    return matchesSearch;
  });
}

function renderTodos() {
  const filtered = getFilteredTodos();
  todoList.innerHTML = '';

  if (filtered.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.textContent = state.todos.length
      ? 'Ничего не найдено'
      : 'Задач пока нет — добавьте первую!';
    todoList.appendChild(empty);
  } else {
    const fragment = document.createDocumentFragment();
    filtered.forEach((todo) => fragment.appendChild(createTodoItem(todo)));
    todoList.appendChild(fragment);
  }

  updateStats();
}

function updateStats() {
  const total = state.todos.length;
  const done = state.todos.filter((t) => t.completed).length;
  const active = total - done;

  totalCount.textContent = total;
  activeCount.textContent = active;
  doneCount.textContent = done;

  if (headerBadge) {
    headerBadge.textContent = `${total} ${pluralizeTasks(total)}`;
  }
}

function pluralizeTasks(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'задача';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'задачи';
  return 'задач';
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
  state.search = searchInput.value;
  renderTodos();
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => setActiveFilter(button));
});

clearCompletedBtn.addEventListener('click', clearCompleted);

state.todos = loadTodos();
renderTodos();