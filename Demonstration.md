# to-do-api-task
 created with backend in node and express and cron

Demonstration:

1-Working with the API:

Use a tool like Postman to interact with the API.

Create a new todo:

Send a POST request to http://localhost:3000/todos with a JSON body like this:

{
  "title": "Buy groceries",
  "completed": false
}



-Retrieve all todos:

---Send a GET request to http://localhost:3000/todos.
Update a todo:

--Send a PUT request to http://localhost:3000/todos/{id}, where {id} is the ID of the todo you want to update. Include the updated data in the request body.
Delete a todo:

--Send a DELETE request to http://localhost:3000/todos/{id}, where {id} is the ID of the todo you want to delete.


2 Cron Job:

The cron job is scheduled to run daily at midnight (00:00).

It will delete all completed todos from the JSON file (./data/todos.json) and save the updated list of todos.

You can observe this by adding some todos with "completed": true, waiting for midnight, and then checking the list of todos using the /todos endpoint. The completed todos should be removed.