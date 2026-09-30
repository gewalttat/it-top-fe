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

function addTodo() {
  // TODO: получить значение из input, проверить пустую строку,
  // создать объект todo и добавить в state.todos,
  // очистить поле ввода и вызвать renderTodos()
}

function deleteTodo(id) {
  // TODO: удалить задачу по id из state.todos
  // и затем вызвать renderTodos()
}

function toggleTodo(id) {
  // TODO: найти задачу по id и поменять completed
  // затем вызвать renderTodos()
}

function searchTodos() {
  // TODO: прочитать значение из searchInput,
  // сохранить в state.search и вызвать renderTodos()
}

function getFilteredTodos() {
  // TODO: вернуть список задач в зависимости от state.filter и state.search
  // Например: all, active, completed
  return [];
}

function renderTodos() {
  // TODO: получить отфильтрованный список через getFilteredTodos()
  // и отрисовать список задач в todoList
  // Подумать про пустое состояние, completed класс и кнопки удаления
}

function updateStats() {
  // TODO: обновить значения totalCount, activeCount, doneCount
  // на основе state.todos
}

function clearCompleted() {
  // TODO: удалить все выполненные задачи и вызвать renderTodos()
}

function setActiveFilter(button) {
  // TODO: обновить state.filter и выделить активную кнопку фильтра
}

todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  addTodo();
});

todoList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-btn');

  if (deleteButton) {
    const { id } = deleteButton.dataset;
    deleteTodo(Number(id));
    return;
  }
});

todoList.addEventListener('change', (event) => {
  const checkbox = event.target.closest('input[type="checkbox"]');

  if (checkbox) {
    const { id } = checkbox.dataset;
    toggleTodo(Number(id));
  }
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
