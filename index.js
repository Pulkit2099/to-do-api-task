const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cron = require('node-cron');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Load initial todos from JSON file
let todos = [];
try {
  todos = JSON.parse(fs.readFileSync('./data/todos.json', 'utf-8'));
} catch (error) {
  console.error('Error loading todos:', error);
}

// Routes for CRUD operations

// Create a new todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  saveTodos();
  res.json(newTodo);
});

// Retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Update a todo by ID
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;

  // Find and update the todo with the given ID
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = updatedTodo;
    saveTodos();
    res.json(updatedTodo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  // Find and remove the todo with the given ID
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
    res.sendStatus(204);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to save todos to the JSON file
function saveTodos() {
  fs.writeFileSync('./data/todos.json', JSON.stringify(todos, null, 2), 'utf-8');
}

// Cron job to delete completed todos daily at midnight  i.e. when task was completed
cron.schedule('0 0 * * *', () => {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  console.log('Completed todos deleted at midnight.');
});
