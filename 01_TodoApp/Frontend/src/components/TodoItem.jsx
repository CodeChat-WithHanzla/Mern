import { useState } from 'react';

function TodoItem({ todo, handleUpdateTodo, handleDeleteTodo }) {
  const [isEditable, setEditable] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleSave = () => {
    handleUpdateTodo(todo._id, { text });
    setEditable(false);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow-lg rounded-lg mb-4 border border-gray-200">
      {isEditable ? (
        <div className="flex items-center flex-grow">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleSave}
            className="ml-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex-grow">
          <span className="text-lg font-semibold text-gray-800">{todo.text}</span>
        </div>
      )}
      <div className="ml-4 flex space-x-2">
        {!isEditable && (
          <button
            onClick={() => setEditable(true)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => handleDeleteTodo(todo._id)}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
