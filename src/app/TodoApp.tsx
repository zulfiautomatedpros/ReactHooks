// TodoApp.tsx
"use client";
import React, { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useFetch from "./useFetch";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext";

export interface ITodo {
  id: number;
  title: string;
  description: string;
  dueDate: string; // ISO date string
  category: string;
  priority: "Low" | "Medium" | "High";
  status: "Completed" | "Yet To Do" | "In Progress" | "Halted";
}

// Define a type for the fetched todo items from the API
interface FetchedTodo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [todos, setTodos] = useLocalStorage<ITodo[]>("todos", []);
  const { data: fetchedTodos, loading, error } = useFetch<FetchedTodo[]>("https://jsonplaceholder.typicode.com/todos");
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    if (fetchedTodos && fetchedTodos.length > 0 && todos.length === 0) {
      const initialTodos: ITodo[] = fetchedTodos.slice(0, 10).map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: "", // API doesn't provide description
        dueDate: new Date().toISOString().slice(0, 10),
        category: "General",
        priority: "Medium",
        status: todo.completed ? "Completed" : "Yet To Do",
      }));
      setTodos(initialTodos);
    }
    // Including todos.length and setTodos in dependency array
  }, [fetchedTodos, todos.length, setTodos]);

  const handleAdd = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleEdit = (todo: ITodo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleFormSubmit = (todoData: Partial<ITodo>) => {
    if (editingTodo) {
      const updatedTodos = todos.map((t) =>
        t.id === editingTodo.id ? { ...t, ...todoData } : t
      );
      setTodos(updatedTodos);
    } else {
      const newTodo: ITodo = {
        id: Date.now(),
        title: todoData.title || "",
        description: todoData.description || "",
        dueDate: todoData.dueDate || new Date().toISOString().slice(0, 10),
        category: todoData.category || "General",
        priority: (todoData.priority as "Low" | "Medium" | "High") || "Medium",
        status: "Yet To Do",
      };
      setTodos([...todos, newTodo]);
    }
    setShowForm(false);
  };

  const handleStatusUpdate = (todoId: number, status: ITodo["status"]) => {
    const updatedTodos = todos.map((t) =>
      t.id === todoId ? { ...t, status } : t
    );
    setTodos(updatedTodos);
  };

  return (
    <div className={`p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h2 className="text-2xl font-bold mb-4">To Do List</h2>
      {loading && <div>Loading todos...</div>}
      {error && <div>Error: {error.message}</div>}
      {showForm ? (
        <TodoForm
          initialData={editingTodo || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <>
          {/* Only Admin (and Active) can create new todos */}
          {user?.role === "Admin" && user.isActive && (
            <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
              Add To Do
            </button>
          )}
          <TodoList todos={todos} onEdit={handleEdit} onStatusUpdate={handleStatusUpdate} />
        </>
      )}
    </div>
  );
};

export default TodoApp;
