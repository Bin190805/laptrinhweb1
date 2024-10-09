import logo from './logo.svg';
import './App.css';
import TodoList from './todo.js'; // Tên file và đường dẫn sửa đúng

function App() {
  return (
    <div className="App">
      <TodoList />  {/* Sử dụng component TodoList với chữ hoa đầu tiên */}
    </div>
  );
}

export default App;
