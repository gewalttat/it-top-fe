/*
  Заготовка для работы с серверным Todo API.

  Сервер:
  http://212.193.11.210:3000

  Каждый ученик работает со своим списком через заголовок X-Student-Id.
  Нужно поменять STUDENT_ID на свой номер от 1 до 15.
*/

const API_URL = 'http://212.193.11.210:3000';
const STUDENT_ID = 1;

const headers = {
  'X-Student-Id': String(STUDENT_ID),
};

const jsonHeaders = {
  ...headers,
  'Content-Type': 'application/json',
};

async function getTodos() {
  // TODO:
  // 1. Сделать GET-запрос на `${API_URL}/todos`
  // 2. Не забыть передать headers
  // 3. Вернуть result.json()
}

async function createTodo(title) {
  // TODO:
  // 1. Сделать POST-запрос на `${API_URL}/todos`
  // 2. Передать jsonHeaders
  // 3. В body отправить JSON.stringify({ title })
  // 4. Вернуть созданную задачу
}

async function updateTodo(id, data) {
  // TODO:
  // 1. Сделать PATCH-запрос на `${API_URL}/todos/${id}`
  // 2. Передать jsonHeaders
  // 3. В body отправить JSON.stringify(data)
  // Пример data: { completed: true } или { title: 'Новый текст' }
}

async function deleteTodo(id) {
  // TODO:
  // 1. Сделать DELETE-запрос на `${API_URL}/todos/${id}`
  // 2. Передать headers
  // 3. У DELETE может не быть JSON-ответа
}

async function main() {
  // TODO: раскомментировать по шагам и проверить в консоли

  // const todos = await getTodos();
  // console.log('todos:', todos);

  // const created = await createTodo('Новая задача из JS');
  // console.log('created:', created);

  // const updated = await updateTodo(created.id, { completed: true });
  // console.log('updated:', updated);

  // await deleteTodo(created.id);
  // console.log('deleted:', created.id);
}

main();

// есть такой массив данных
// на выходе нужно получить объект с сортировкой элементов по type, например

// { 
// pending: [{ description: "OAO ABC", type: "pending" }, { description: "Ginza", type: "pending" }],
// xxx: [{ description: "Tinkoff", type: "xxx" }],
// processed: [{ description: "BurgerKing", type: "processed" },  { description: "Zara", type: "processed" }]
// }


function convert(arr) {
  // code here
}
