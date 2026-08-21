# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:

--- The Todo Tracker API follows REST principles in three main ways. First, it uses resource-based URLs like /api/todos and /api/todos/:id to identify data. Second, it uses HTTP methods such as GET, POST, PATCH, and DELETE to perform different actions on that data. Finally, it uses status codes like 200, 201, 204, and 404 to clearly communicate the result of a request to the client.

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

--- Mixing data logic and request/response logic in one file makes the code harder to read, maintain, and debug. Separating them into a model and controller follows separation of concerns. The model handles data operations, while the controller handles requests and responses. This makes the application easier to organize, update, and test as it grows.

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

--- When a user clicks a checkbox, the frontend sends a PATCH request to /api/todos/:id with the updated isDone value. In index.js, the request is matched to the updateTodo controller function. The controller reads the id and isDone value from the request and calls the update() method in todoModel.js. The model updates the matching todo and returns it to the controller, which then sends a 200 response back to the frontend with the updated todo. 

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body; // This is a Controller because This line reads data from req.body, which is part of the HTTP request. Parsing request data is the controller's responsibility.
  /* 2 */ if (!task) return res.status(400).send({ message: 'task is required' });// This is a Controller because this line validates the request and sends a 400 response if the required data is missing. Sending responses is a controller responsibility.
  /* 3 */ const newTodo = { id: getId(), task, isDone: false }; // This is a Model this line creates a new todo object and contains data-related logic. Creating and managing data belongs in the model.
  /* 4 */ todos.push(newTodo); // This is a Model and this line modifies the todos array by storing the new todo. Data storage and manipulation should be handled by the model.
  /* 5 */ res.status(201).send(newTodo); // This is a Controller because this line sends the HTTP response back to the client with a 201 status code. Communicating with the client is the responsibility of the controller.
};
```