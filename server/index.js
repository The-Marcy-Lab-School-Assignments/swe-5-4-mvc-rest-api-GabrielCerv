const express = require('express');
const path = require('path');
const todoControllers = require('./controllers/todoControllers');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');

////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// Routes
////////////////////////

app.get('/api/todos', todoControllers.listTodos);
app.get('/api/todos/:id', todoControllers.findTodo);
app.post('/api/todos', todoControllers.createTodo);
app.patch('/api/todos/:id', todoControllers.updateTodo);
app.delete('/api/todos/:id', todoControllers.deleteTodo);

// Catch-all — 404 for unmatched routes
app.use((req, res) => {
  res.status(404).send({
    message: `Error: Not found ${req.originalUrl}`
  });
});

const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
