const express = require('express');
const connectDB = require('./configs/database');
const todosRouter = require('./routers/todo');
const cors = require('cors'); // Thêm dòng này
const app = express();
const PORT = 5000;

// Kết nối MongoDB
connectDB();

// Middleware để xử lý JSON
app.use(express.json());

// Middleware CORS
app.use(cors()); // Thêm dòng này

// Sử dụng router cho todos
app.use('/todo', todosRouter);

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
