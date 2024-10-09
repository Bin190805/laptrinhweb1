import React, { useState } from 'react';
import './TodoApp.css'; // Thêm CSS vào ứng dụng

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Học lập trình web với React', status: 'Todo', date: '2024-10-12' },
    { id: 2, text: 'Gửi email nộp bài tập về nhà', status: 'Todo', date: '2024-10-10' },
    { id: 3, text: 'Học từ vựng tiếng anh mỗi ngày', status: 'Todo', date: '2024-10-08' },
    { id: 4, text: 'Viết tiểu luận môn Triết học', status: 'Todo', date: '2024-10-05' },
  ]);

  const [newTask, setNewTask] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editDateId, setEditDateId] = useState(null);
  const [editDate, setEditDate] = useState('');

  // Hàm thêm mới task
  const addTask = () => {
    if (newTask.trim() !== '' && newDate.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        text: newTask,
        status: 'Todo',
        date: newDate,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
      setNewDate('');
    }
  };

  // Hàm xóa task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  // Hàm thay đổi trạng thái từ Todo -> Done và ngược lại
  const toggleStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === 'Todo' ? 'Done' : 'Todo' } : task
    );
    setTasks(updatedTasks);
  };

  // Bắt đầu chỉnh sửa ngày
  const startEditDate = (id, currentDate) => {
    setEditDateId(id);
    setEditDate(currentDate);
  };

  // Lưu ngày đã chỉnh sửa
  const saveEditDate = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, date: editDate } : task
    );
    setTasks(updatedTasks);
    setEditDateId(null);
  };

  return (
    <div className="todo-app">
      <h1>My work 🎯</h1>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.status === 'Done' ? 'done' : ''}`}>
            <span className="task-text">{task.text}</span>
            <div className="task-details">
              {editDateId === task.id ? (
                <>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                  />
                  <button onClick={() => saveEditDate(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <em onClick={() => startEditDate(task.id, task.date)}>{task.date}</em>

                  {/* Thêm vòng tròn để thay đổi trạng thái */}
                  <span
                    className={`circle ${task.status === 'Done' ? 'done' : ''}`}
                    onClick={() => toggleStatus(task.id)}
                  ></span>

                  <button onClick={() => deleteTask(task.id)} className="delete-btn">X</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Form thêm task mới */}
      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add task"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={addTask} className="add-task-btn">Add task</button>
      </div>
    </div>
  );
};

export default TodoApp;
