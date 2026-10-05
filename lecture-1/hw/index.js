const state = {
  todos: [],
  filter: 'all',
  search: '',
  isLoading: false,
};

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const searchInput = document.getElementById('search-input');
const list = document.getElementById('todo-list');
const countersEl = document.getElementById('counters');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterButtons = document.querySelectorAll('.filters button');

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

function addTodo(text) {
  return new Promise((resolve) => {
    state.isLoading = true;
    renderTodos();

    setTimeout(() => {
      state.todos.push({
        id: Date.now(),
        text: text.trim(),
        completed: false,
      });
      state.isLoading = false;
      renderTodos();
      resolve();
    }, 500);
  });
}

function deleteTodo(id) {
  if (state.isLoading) return;

  return new Promise((resolve) => {
    state.isLoading = true;
    renderTodos();

    setTimeout(() => {
      state.todos = state.todos.filter((t) => t.id !== id);
      state.isLoading = false;
      renderTodos();
      resolve();
    }, 400);
  });
}

function toggleTodo(id) {
  const todo = state.todos.find((t) => t.id === id);
  if (!todo) return;
  todo.completed = !todo.completed;
  renderTodos();
}

function getVisibleTodos() {
  return state.todos.filter((todo) => {
    const matchesFilter =
      state.filter === 'all' ||
      (state.filter === 'active' && !todo.completed) ||
      (state.filter === 'completed' && todo.completed);

    const matchesSearch = todo.text
      .toLowerCase()
      .includes(state.search.toLowerCase().trim());

    return matchesFilter && matchesSearch;
  });
}

function renderCounters() {
  const total = state.todos.length;
  const active = state.todos.filter((t) => !t.completed).length;
  const completed = total - active;
  countersEl.textContent =
    `Всего: ${total} | Активные: ${active} | Выполненные: ${completed}`;
}

function renderTodos() {
  list.innerHTML = '';

  if (state.isLoading) {
    list.innerHTML = '<li class="loading">Сохраняем...</li>';
    return;
  }

  const visible = getVisibleTodos();

  if (visible.length === 0) {
    list.innerHTML = '<li class="empty">Ничего не найдено</li>';
    renderCounters();
    return;
  }

  visible.forEach((todo) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'todo completed' : 'todo';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', createToggleHandler(todo.id));

    const span = document.createElement('span');
    span.textContent = todo.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.setAttribute('aria-label', 'Удалить задачу');
    delBtn.addEventListener('click', createDeleteHandler(todo.id));

    li.append(checkbox, span, delBtn);
    list.appendChild(li);
  });

  renderCounters();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (!text) return;
  if (state.isLoading) return;

  addTodo(text).then(() => {
    input.value = '';
    input.focus();
  });
});

searchInput.addEventListener('input', (e) => {
  state.search = e.target.value;
  renderTodos();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    filterButtons.forEach((b) =>
      b.classList.toggle('active', b === btn)
    );
    renderTodos();
  });
});

clearCompletedBtn.addEventListener('click', () => {
  state.todos = state.todos.filter((t) => !t.completed);
  renderTodos();
});

renderTodos();
