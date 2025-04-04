// TodoList.tsx
"use client";
import React from "react";
import { ITodo } from "./TodoApp";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: ITodo[];
  onEdit: (todo: ITodo) => void;
  onStatusUpdate: (todoId: number, status: ITodo["status"]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onStatusUpdate }) => {
  const sortedTodos = [...todos].sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  return (
    <div>
      {sortedTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onEdit={onEdit} onStatusUpdate={onStatusUpdate} />
      ))}
    </div>
  );
};

export default TodoList;
