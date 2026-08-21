const todoModel = require('../models/todoModel');

const listTodos = (req, res) => {
  res.send(todoModel.list());
};

const findTodo = (req, res) => {
  const { id } = req.params;
  const todo = todoModel.find(Number(id));
  if (!todo) {
    return res.status(404).send({ message: `No todo with the id ${id}` });
  }
  res.send(todo);
};

const createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send({ message: `Error no task created` });
  }
  const newTodo = todoModel.create(task);
  res.status(201).send(newTodo);
};

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;
  const todo = todoModel.update(Number(id), { isDone });
  if (!todo) {
    return res.status(404).send({ message: `No todo with id ${id}` });
  }
  res.status(200).send(todo);
};

const deleteTodo = (req, res) => {
  const { id } = req.params;
  const deleted = todoModel.destroy(Number(id));
  if (!deleted) {
    return res.status(404).send({ message: `could not delete task with id ${id}` });
  }
  res.sendStatus(204);
};

module.exports = { listTodos, findTodo, createTodo, updateTodo, deleteTodo };
