import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodo, deleteTodo } from "./todosSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items) || [];
  const status = useSelector((state) => state.todos.status);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    const title = prompt("Enter todo:");
    if (title) {
      dispatch(addTodo({ title }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h2>My Todo App</h2>
      <button onClick={handleAdd}>➕ Add Todo</button> //+ sourced from the
      original code
      {status === "loading" && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TodoList todos={todos} onDelete={handleDelete} />
    </div>
  );
}

function TodoList({ todos, onDelete }) {
  if (!todos.length) {
    return <p>No todos yet.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0.5rem 0",
            borderBottom: "1px solid #d86d6dff",
            paddingBottom: "0.25rem",
          }}
        >
          <span>{todo.title}</span>
          <button onClick={() => onDelete(todo.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
}

export default App;
