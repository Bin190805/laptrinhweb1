import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todo');
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError('Không thể lấy danh sách công việc');
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (newTitle.trim() === '' || newDueDate.trim() === '') {
      setError('Tất cả các trường đều bắt buộc');
      return;
    }
    const newTaskObj = { title: newTitle, description: newDescription, due_date: newDueDate, completed: false };
    try {
      const response = await axios.post('http://localhost:5000/todo', newTaskObj);
      setTasks([...tasks, response.data]);
      setNewTitle('');
      setNewDescription('');
      setNewDueDate('');
      setError('');
    } catch (error) {
      console.error("Error adding task:", error);
      setError(`Không thể thêm công việc mới: ${error.response ? error.response.data.error : error.message}`);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setError('');
    } catch (error) {
      console.error("Error deleting task:", error);
      setError('Không thể xoá công việc');
    }
  };

  const completeTask = async (task) => {
    try {
      console.log('Completing task:', task); // Log the task being completed
      const response = await axios.put(`http://localhost:5000/todo/${task._id}/complete`);
      console.log('Complete Task Response:', response.data); // Log the response
      setTasks(tasks.map((t) => (t._id === task._id ? { ...t, completed: true } : t)));
      setError('');
    } catch (error) {
      console.error("Error updating task status:", error.response ? error.response.data : error.message);
      setError('Không thể cập nhật trạng thái công việc');
    }
  };

  const startEditTask = (id, currentTitle, currentDescription, currentDueDate) => {
    setEditTaskId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
    setEditDueDate(currentDueDate);
  };

  const saveEditTask = async (id) => {
    if (editTitle.trim() === '' || editDueDate.trim() === '') {
      setError('Tất cả các trường đều bắt buộc');
      return;
    }
    try {
      const response = await axios.put(`http://localhost:5000/todo/${id}`, { title: editTitle, description: editDescription, due_date: editDueDate });
      console.log('Save Edit Task Response:', response.data); // Log the response
      setTasks(tasks.map((task) => (task._id === id ? { ...task, title: editTitle, description: editDescription, due_date: editDueDate } : task)));
      setEditTaskId(null);
      setError('');
    } catch (error) {
      console.error("Error saving edited task:", error.response ? error.response.data : error.message);
      setError('Không thể lưu công việc đã chỉnh sửa');
    }
  };

  return (
    <div className="todo-app">
      <h1>My work 🎯</h1>
      {error && <p className="error">{error}</p>}
      <div className="task-header">
        <span className="task-title-header">Title</span>
        <span className="task-description-header">Description</span>
        <span className="task-date-header">Date</span>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className={`task-item ${task.completed ? 'done' : ''}`}>
            {editTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                />
                <button onClick={() => saveEditTask(task._id)}>Save</button>
              </>
            ) : (
              <>
                <span className="task-text">{task.title}</span>
                <span className="task-description">{task.description}</span>
                <span className="task-date">{task.due_date}</span>
                <div className="task-details">
                  <span
                    className={`circle ${task.completed ? 'done' : ''}`}
                    onClick={() => completeTask(task)}
                  ></span>
                  <button onClick={() => startEditTask(task._id, task.title, task.description, task.due_date)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteTask(task._id)} className="delete-btn">X</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="task-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add title"
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Add description"
        />
        <input
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
        <button onClick={addTask} className="add-task-btn">Add task</button>
      </div>
    </div>
  );
};

export default TodoApp;
