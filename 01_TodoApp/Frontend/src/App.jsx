import { useState, useEffect } from 'react';
import { get, post, put, deleteReq } from './api/index.js';
import TodoItem from './components/TodoItem.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  // Main Functionality
  const loadTodos = async () => {
    const { data } = await get();
    setTodos(data.todos);
  };

  const handleCreateTodo = async () => {
    if (!text?.trim()) return;
    await post(text);
    setText('');
    loadTodos();
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    await put(id, updatedTodo);
    loadTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteReq(id);
    loadTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo App</h1>
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            placeholder="Add a Todo"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Add
          </button>
        </div>
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleUpdateTodo={handleUpdateTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
