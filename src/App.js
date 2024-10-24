import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faEdit, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import TodoIcon from './assets/iconTodo.png'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filter, setFilter] = useState('semua');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');

  const addTodo = () => {
    if (newTodo.trim() && startDate && endDate) {
      setTodos([...todos, { text: newTodo, completed: false, startDate, endDate }]);
      setNewTodo('');
      setStartDate('');
      setEndDate('');
    } else {
      alert('Please fill in the task and dates.');
    }
  };

  const openEditModal = (index) => {
    const todo = todos[index];
    setEditIndex(index);
    setEditText(todo.text);
    setEditStartDate(todo.startDate);
    setEditEndDate(todo.endDate);
    setEditModalOpen(true);
  };

  const updateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = {
      ...updatedTodos[editIndex],
      text: editText,
      startDate: editStartDate,
      endDate: editEndDate,
    };
    setTodos(updatedTodos);
    setEditModalOpen(false);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'sudah selesai') return todo.completed;
    if (filter === 'belum selesai') return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-950 flex items-center">
          To-Do List
          <img src={TodoIcon} alt="To-Do Icon" className="w-10 h-10 ml-3" />
        </h1>

        <div className="mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Tambah tugas anda.."
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="flex mb-4">
          <div className="mr-2 flex-1">
            <label className="block text-xs mb-1 font-medium text-gray-500">*Tanggal Mulai</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
          <div className="ml-2 flex-1">
            <label className="block text-xs mb-1 font-medium text-gray-500">*Tanggal Akhir / Deadline</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>
        </div>
        
        <button
          onClick={addTodo}
          className="bg-orange-600 text-white px-4 h-11 mb-5 rounded-full shadow hover:bg-orange-700 transition duration-300 w-full"
        >
          Submit
        </button>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {['semua', 'sudah selesai', 'belum selesai'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`py-2 rounded-lg transition duration-300 ${filter === type ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-orange-300'}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <ul>
          {filteredTodos.map((todo, index) => (
            <li
              key={index}
              className={`flex justify-between items-center mb-4 p-4 rounded-lg shadow-lg transition duration-300 border ${todo.completed ? ' bg-orange-50' : 'bg-gray-200 border-gray-300'}`}
            >
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer mr-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="hidden"
                  />
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${todo.completed ? 'bg-red-500 border-red-500' : 'border-gray-400'}`}>
                    {todo.completed && (
                      <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                </label>
                <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-600' : 'text-gray-800'}`}>{todo.text}</span>
                <span className="text-gray-600 text-sm ml-3">{todo.startDate} <FontAwesomeIcon icon={faArrowRight} className='ml-2 mr-2 text-xs'/> {todo.endDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(index)}
                  className="text-gray-400 hover:text-gray-600 transition duration-300 flex items-center"
                >
                  <FontAwesomeIcon icon={faEdit} className="" /> 
                </button>
                <button
                  onClick={() => deleteTodo(index)}
                  className="text-gray-400 hover:text-gray-600 transition duration-300 flex items-center"
                >
                  <FontAwesomeIcon icon={faX} className="w-4 h-4" /> 
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Task"
              className="w-full px-4 py-2 border border-gray-300 rounded-full mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
            <input
              type="date"
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">Tanggal Akhir / Deadline</label>
            <input
              type="date"
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={updateTodo}
                className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700"
              >
                Update
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="ml-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
