// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

const list = () => todos.map((todo) => ({ ...todo }));

const find = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  return todo ? { ...todo } : null;
};

const create = (task) => {
  const newTodo = {
    id: getId(),
    task,
    isDone: false,
  };
  todos.push(newTodo);
  return { ...newTodo };
};

const update = (id, changes) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  Object.assign(todo, changes);
  return { ...todo };
};

const destroy = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index < 0) {
    return false;
  }
  todos.splice(index, 1);
  return true;
};

module.exports = { list, find, create, update, destroy };
